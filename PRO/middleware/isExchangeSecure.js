const decodeSignature = require('../services/decodeSignature')

const isExchangeSecure = (req, res, next) => {
    try {
    
        const requestedExchange = Buffer.from(req.body.exchange, 'base64').toString();

        const exchange = JSON.parse(requestedExchange);        
        
        const signatureDecoded = decodeSignature(exchange.signature);

        if (!signatureDecoded) { return res.status(400).json({status: 'error', message: 'Invalid exchange signature.'});}
        
    
        if (!exchange.exchange_id || !exchange.amount || !exchange.rate || !exchange.fee || !exchange.signature) {
            return res.status(400).json({status: 'error', message: 'Invalid exchange body.', data: {exchange_id:'', amount: '', rate: '',fee: '',  signature: ''}});
        }

        req.body.checked = exchange;
        
        next();
    } catch (error) {
        // The exchange signature is not valid.
        return res.status(400).json({status: 'error', message: 'Invalid exchange format.'});
    }
}

module.exports = isExchangeSecure;