import React from 'react';

import AxiosInstance from '../utilities/AxiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import CheckIfLogged from '../utilities/CheckIfLogged';
import Nav from './Nav.jsx';
import '../css/nav.css';
import "../css/sign-in.css"


import { useEffect, useState } from 'react';

const SignIn = () => {
    const navigate = useNavigate();

    const [logged , setLogged] = useState(CheckIfLogged);
    
    const [email, setEmail]             = useState(null);
    const [emailError, setEmailError]   = useState(null);
    const [pwd, setPwd]                 = useState(null);
    const [pwdError, setPwdError]       = useState(null);
    const [error, setError]             = useState(null);


    useEffect(() => {

        if (logged) {
            navigate("/");
        }
    });


    const handleInput = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'pwd': 
                setPwd(e.target.value);
                break;
            default:
                break;
        }
    }


    const sendInput = (e) => {
        e.preventDefault();

        AxiosInstance.post('/users/signin', {email: email, pwd: pwd})
        .then((res) => {
            handleResponse(res.data);
        })
        .catch((err) => {
            displayErrors(err.response.data);
        })
    }


    const displayErrors = (err) => {
        err.email ? setEmailError(err.email) : setEmailError(null);
        err.password ? setPwdError(err.password) : setPwdError(null);
        err.error ? setError(err.error) : setError(null);
    }


    const handleResponse = (res) => {

        const token = CheckIfLogged();

        if (!token) {
            localStorage.setItem('TOKEN', res.accessToken);
        }

        navigate('/account');
    }


    return ( 
        <React.Fragment>
        <Nav />
        <form className='sign-in_form' onSubmit={sendInput}>
            <input type="text" name='email' placeholder='Email' onChange={e => handleInput(e)}/>
            <strong>{emailError}</strong>
            <input type="pwd" name='pwd' placeholder='Password' onChange={e => handleInput(e)}/>
            <strong><Link className='' to={'/reset-password'}>Forgot password ?</Link></strong>
            <strong>{pwdError}</strong>
            <strong>{error}</strong>
            <button type='submit'>Log in</button>
        </form>
    </React.Fragment>
     );
}
 
export default SignIn;