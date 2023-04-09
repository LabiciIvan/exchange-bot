import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Validator from '../utilities/Validator';
import AxiosInstance from '../utilities/AxiosInstance';
import CheckAndLogg from '../utilities/CheckAndLogg';

import Nav from './Nav.jsx';
import "../css/shared-sign-up-in.css"
import '../css/nav.css';
import "../css/sign-in.css"

const SignIn = () => {

    const navigate = useNavigate();
    const [logged , setLogged] = useState(CheckAndLogg);
    
    const [email, setEmail]                     = useState(null);
    const [password, setPassword]               = useState(null);
    const [email_error, setEmailError]          = useState(null);
    const [password_error, setPasswordError]    = useState(null);

    const rules = {
        email: 'required|email|max:30',
        password: 'required',
    }

    const values = {
        email: email,
        password: password,
    }

    useEffect(() => {
        // We redirect user if he's logged in.
        logged && navigate("/");
    });


    const handleInput = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password': 
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    }


    const sendInput = (e) => {
        e.preventDefault();

        // Create a new instance of the Validator Class.
        const Validate =  new Validator(rules, values);

        // Ask Validator to check for errors.
        Validate.check()
            .then(() => {
                setEmailError(null);
                setPasswordError(null);
                
                // Successful frontend validation, send to backend.
                AxiosInstance.post('/auth/signin', {email: email, pwd: password})
                    .then((res) => {
                        // Successful response from backend.
                        handleResponse(res.data.data);
                    })
                    .catch((err) => {
                    // Unsuccessful response from backend.
                    const errors = {...err.response.data};
                    errors.email ? setEmailError(errors.email) : setEmailError(null);
                    errors.password ? setPasswordError(errors.password) : setPasswordError(null);
                    });
            })
            .catch(err => {
                // Unsuccessful frontend validation, display errors.
                err.email ? setEmailError(err.email) : setEmailError(null);
                err.password ? setPasswordError(err.password) : setPasswordError(null);
            });
    }


    const displayError = (err) => {
        return err.map(e => {
            return <li className='error-message' key={e}>{e}</li>
        });
    }


    const handleResponse = (res) => {
        CheckAndLogg(res);
        
        // We redirect user after we stored the token.
        navigate('/account');
    }


    return ( 
        <React.Fragment>
        <Nav />
        <form className='sign-in _form' onSubmit={sendInput}>
            <div className="sign-in_input-wrapper">
                <h6 className='sign-in _title'>Sign In</h6>
                <input className='sign-in _input' type="text" name='email' placeholder='Email' onChange={e => handleInput(e)}/>
                {email_error ? displayError(email_error) : ''}
                <input className='sign-in _input' type="password" name='password' placeholder='Password' onChange={e => handleInput(e)}/>
                {password_error ? displayError(password_error) : ''}
            </div>
            <div className="sign-in_control-wrapper">
                <h5 className='sign-in_policy'>
                    Forgot your password ?
                    Click the link to reset it.
                    Please note that password reset is only available once per day.
                    <Link className='sign-in_forgot' to={'/reset-password'}>Forgot password ?</Link>
                </h5>
                <button className='sign-in _btn' type='submit'>Log in</button>
            </div>
        </form>
    </React.Fragment>
     );
}
 
export default SignIn;