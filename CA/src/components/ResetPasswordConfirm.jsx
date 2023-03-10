import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AxiosInstance from '../utilities/AxiosInstance';

const ResetPasswordConfirm = () => {
    
    const {token} = useParams();

    const [passwordError, setPasswordError]      = useState(null);
    const [password, setPassword]                = useState(null);
    const [passwordConfirm, setPasswordConfirm]  = useState(null);

    useEffect(() => {
        AxiosInstance.post('/users/reset-password/verify', {token: token})
        .then(res => {
            navigate('/');
        })
        .catch(err => {
            setPasswordError(null);
            err.response.data.error && navigate('/sign-in');
        })
    },[]);

    const navigate = useNavigate();

    const handlePassword = (e) => {

        switch (e.target.name) {
            case 'pwd':
                setPassword(e.target.value);
                break;
            case 'pwd_confirm':
                setPasswordConfirm(e.target.value);
                break;
        
            default:
                break;
        }
    }


    const handleResetPasword = (e) => {
        e.preventDefault();
        AxiosInstance.post('/users/reset-password/verify', {token: token, pwd: password, pwd_confirm: passwordConfirm})
        .then(res => {
            if (res.data) {

                navigate('/');
            }

        })
        .catch(err => {
            if (err.response.data.error) {
                navigate('/');
            } else {
                setPasswordError(err.response.data);
            }
        })
    }

    return ( 
        <form  onSubmit={handleResetPasword}>
            <input type="text" className="reset-input" placeholder='New Password' name='pwd' onChange={(e) => handlePassword(e)} />
            <input type="text" className="reset-input" placeholder='Confirm New Password' name='pwd_confirm' onChange={(e) => handlePassword(e)}/>
            <strong>{passwordError}</strong>
            <button type='submit'>Confirm</button>
        </form>

     );
}
 
export default ResetPasswordConfirm;