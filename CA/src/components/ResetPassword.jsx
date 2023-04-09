import React, { useEffect, useState } from 'react';
import Nav from './Nav';

import CheckAndLogg from '../utilities/CheckAndLogg';
import { useNavigate, Link } from 'react-router-dom';
import AxiosInstance from '../utilities/AxiosInstance'

const ResetPassword = () => {
    const navigate = useNavigate();

    const [logged, setLogged] = useState(CheckAndLogg);
    const [email, setEmail] = useState(null);

    const [resetError, setResetError] = useState(null);
    const [resetToken, setResetToken] = useState(null);

    useEffect(() => {
        logged && navigate('/account');
    });

    const handleEmail = (email) => {
        setEmail(email);
    }

    const handleResetPasword = (e) => {
        e.preventDefault();

        AxiosInstance.post('/users/reset-password', {email: email})
        .then(res => {
            handleResponse(res.data);
        })
        .catch(err => {
            handleResponse(err.response);
        })
    }

    const handleResponse = (result) => {
        result.data ? setResetError(result.data) : setResetError(null); 
        result.token ? setResetToken(result.token) : setResetToken(null); 
    }

    const formatResetLink = () => {

        return <Link to={`/reset-password/verify/${resetToken}`}>Reset Password</Link>;
    }

    return ( 
        <React.Fragment>
            <Nav />
            <form onSubmit={handleResetPasword}>
                <input type="text" placeholder='email' onChange={e => handleEmail(e.target.value)} />
                <button type='submit'>Reset</button>
                <strong>{resetError}</strong>
                <strong>{resetToken && formatResetLink()}</strong>
            </form>
        </React.Fragment>
     );
}
 
export default ResetPassword;