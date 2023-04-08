import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import AxiosInstance from '../utilities/AxiosInstance';
import CheckIfLogged from '../utilities/CheckIfLogged';

import Nav from './Nav.jsx';
import "../css/shared-sign-up-in.css"
import '../css/nav.css';
import "../css/sign-in.css"



const SignIn = () => {

    const navigate = useNavigate();
    const [logged , setLogged] = useState(CheckIfLogged);
    
    const [email, setEmail]             = useState(null);
    const [pwd, setPwd]                 = useState(null);
    const [error, setError]             = useState(null);


    useEffect(() => {
         // We redirect user if he's logged in.
        logged && navigate("/");
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

        AxiosInstance.post('/auth/signin', {email: email, pwd: pwd})
        .then((res) => {
            handleResponse(res.data);
        })
        .catch((err) => {
            displayErrors(err.response.data);
        })
    }


    const displayErrors = (err) => {
        err.message ? setError(err.message) : setError(null);
    }


    const handleResponse = (res) => {

        const token = CheckIfLogged();

        if (!token) {
            localStorage.setItem('TOKEN', res.accessToken);
        }

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
                <strong>{error}</strong>
                <input className='sign-in _input' type="pwd" name='pwd' placeholder='Password' onChange={e => handleInput(e)}/>
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