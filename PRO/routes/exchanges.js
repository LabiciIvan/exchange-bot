const express = require('express');
const router = express();

const isLogged = require('../middleware/isLogged');
const DecodeToken = require('../services/DecodeToken');
const isAdmin = require('../middleware/isAdmin');
const Query = require('../services/Query');
const moment = require('moment');
const isExchangeSecure = require('../middleware/isExchangeSecure');

router.get('/', isLogged, (req, res) => {
    (async () => {
        try {
            const user = await DecodeToken(req.headers['authorization']);
            
            if (!isAdmin(user.admin)) { return res.status(403).json({status: "fail", message: "Unauthorized to perform this action!"})}

            const SQL_QUERY = 'SELECT * from exchanges';
            const exchanges = await Query(SQL_QUERY);

            return res.status(200).json({status: 'success', message: 'Exchanges list.', data: exchanges})
        } catch (error) {
            if (error) return res.status(500).json({status: error, message: "Internal system error!"});   
        }
    })();
});


router.get('/user/:userId', (req, res) => {
    (async () => {
        try {
            const userId = parseInt(req.params.userId);
            const user = await DecodeToken(req.headers['authorization']);

            if (user.id !== userId) {
                if (!isAdmin(user)) { return res.status(403).json({status: 'fail', message: 'Unauthorized to perform this action!'}); }
            }

            const SQL_QUERY = 'SELECT id, type, amount, currency, rate, status, notes, created_at FROM exchanges WHERE user_id = ? AND deleted = false';

            const exchanges = await Query(SQL_QUERY, userId);

            if (exchanges.length === 0) { return res.status(404).json({status: 'fail', message: 'This user has no exchanges.'})}

            return res.status(200).json({status: 'success', message: `Exchanges user ${userId}`, data: exchanges})
            
        } catch (error) {
            return res.status(500).json({status: 'error', message: 'Internal system error!'});
        }
    })();
});


router.post('/user', isLogged,  (req, res) => {
    (async () => {
        try {

            switch (req.body.type) {
                case 'BUY':
                case  'SELL':
                    break;
                default:
                    return res.status(400).json({status: 'fail', message: 'Currently only BUY and SELL'});
            }

            const user = await DecodeToken(req.headers['authorization']);

            const SQL_QUERY = 'INSERT INTO exchanges(user_id, type) VALUES (?,?);';

            const result = await Query(SQL_QUERY, [user.id, req.body.type]);
            
            const resultJSON = JSON.parse(JSON.stringify(result));

            return res.status(200).json({status: 'success', message: 'Exchange initialised.', data:resultJSON.insertId});
            
        } catch (error) {
            return res.status(500).json({status: 'error', message: 'Internal system error!'});
        }
    })();
});


router.put('/user/:exchangeId', isLogged, isExchangeSecure, (req, res) => {
    (async () => {
        try {
            const exchangeId = parseInt(req.params.exchangeId);
            const requestedExchange = req.body.checked;

            const user = await DecodeToken(req.headers['authorization']);

            const SQL_QUERY_EX = 'SELECT id, user_id FROM exchanges WHERE id = ? AND status = \'PENDING\' LIMIT 1';
            const [exchange] = await Query(SQL_QUERY_EX, exchangeId);

            if (!exchange) return res.status(403).json({status: 'error', message: 'Transaction already completed.'});

            if (user.id !== exchange.user_id || requestedExchange.exchange_id !== exchange.id ) {
                return res.status(403).json({status: 'fail', message: 'Unauthorized to perform this action!'});
            }
                        
            const SQL_QUERY = 'UPDATE exchanges SET status = ?, amount = ?, rate = ?, fee = ? WHERE id = ? AND user_id = ? AND status = \'PENDING\'';

            await Query(SQL_QUERY, ['COMPLETED',requestedExchange.amount, requestedExchange.rate, requestedExchange.fee, exchangeId, user.id]);

            return res.status(200).json({status: 'success', message: `Transaction #-${exchangeId} COMPLETED.`});
            
        } catch (error) {
            return res.status(500).json({status: 'error', message: 'Internal system error.'}) ;  
        }
    })();
});


router.delete('/user/:exchangeId', isLogged, (req, res) => {
    (async () => {
        try {
            const exchangeId = parseInt(req.params.exchangeId);
            
            const user = await DecodeToken(req.headers['authorization']);
            
            const [exchange] = await Query('SELECT user_id from exchanges WHERE id = ?', exchangeId);

            if (user.id !== exchange.user_id) { return res.status(403).json({status: 'fail', message: 'Unauthorized to perform this action!'})}
        
            const SQL_QUERY = 'UPDATE exchanges SET deleted = ?, deleted_at = ? WHERE id = ? AND user_id = ? AND deleted = ?';
        
            Query(SQL_QUERY, [true, moment().format("YYYY-MM-DD HH:mm:ss"), exchangeId, user.id, false]);
        
            return res.status(200).json({status: 'success', message: 'The exchange has been deleted.'});
        
        } catch (error) {
            return res.status(500).json({status: 'error', message: 'Internal system error.'});
        }
    })();
})




module.exports = router;
