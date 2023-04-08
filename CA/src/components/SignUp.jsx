import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Validator from '../utilities/Validator';
import AxiosInstance from '../utilities/AxiosInstance';
import CheckIfLogged from '../utilities/CheckIfLogged';

import Nav from './Nav.jsx';
import Policy from './Policy';
import "../css/shared-sign-up-in.css";
import "../css/sign-up.css";
import '../css/nav.css';

const SignUp = () => {
    
    const navigate                                          = useNavigate();
    const [logged, setLogged]                               = useState(CheckIfLogged);
    
    const [policy, setPolicy]                               = useState('');
    const [name, setName]                                   = useState('');
    const [email, setEmail]                                 = useState('');
    const [password, setPassword]                           = useState('');
    const [password_confirmation, setPasswordConfirmation]  = useState('');
    
    const [error_policy, setErrorPolicy]                    = useState(null);
    const [error_name, setErrorName]                        = useState(null);
    const [error_password, setErrorPassword]                = useState(null);
    const [error_email, setErrorEmail]                      = useState(null);

    // Declare rules for Validator.
    const rules = {
        policy: 'required', 
        name: 'alphaWithout:<>{}!;:#@|min  :  2|max:20|required',
        email: 'required|email|max:30',
        password: 'required|alphaNumeric|confirmed',
        password_confirmation: 'required',
    }
    
    // Declare values for Validator.
    const values = {
        policy: policy,
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
    }

    useEffect(() => {
        // We redirect user if he's logged in.
        logged && navigate('/');
    });


    const handleInput = (e) => {
        switch (e.target.name) {
            case 'policy':
                policy === true ? setPolicy(null) : setPolicy(true);
                break;
            case 'name':
                setName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'password_confirmation':
                setPasswordConfirmation(e.target.value);
                break;
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        // Instantiate a new object to use validator class.
        const Validate = new Validator(rules, values);

        // Ask Validator to check for errors.
        Validate.check()
            .then((res) => {
                // Successfull validation, prepare to send to backend.
                setErrorPolicy(null);
                setErrorName(null);
                setErrorEmail(null);
                setErrorPassword(null);

                // Call to backend.
                AxiosInstance.post('/auth/signup', {name:name, email: email, pwd: password, pwd_confirm: password_confirmation, policy: policy})
                    .then((res) => {
                        // Backend validation success, go to SIGN IN PAGE.
                        navigate('/sign-in');
                    })
                    .catch((err) => {
                        // Backend Validation failed display errors.
                        // Destruct the response from backend for easy manipulation.
                        const errors = {...err.response.data}
                        errors.policy ? setErrorPolicy(errors.policy) : setErrorPolicy('');
                        errors.name ? setErrorName(errors.name) : setErrorName('');
                        errors.email ? setErrorEmail(errors.email) : setErrorEmail('');
                        errors.pwd ? setErrorPassword(errors.pwd) : setErrorPassword('');
                    });
            })
            .catch((err) => {
                // Failed validation, prepare to display errors.
                err.policy ? setErrorPolicy(err.policy) : setErrorPolicy('');
                err.name ? setErrorName(err.name) : setErrorName('');
                err.email ? setErrorEmail(err.email) : setErrorEmail('');
                err.password ? setErrorPassword(err.password) : setErrorPassword('');
            });
    }


    const displayError = (err) => {
        return err.map(e => {
            return <li className='error-message' key={e}>{e}</li>
        });
    }


    return ( 
        <React.Fragment>
            <Nav />
            <form className='sign-up _form' onSubmit={e => handleSubmit(e)}>
                <div className='sign-up_input-wrapper'>
                    <h6 className='sign-up _title'>Sign Up</h6>
                    <input className='sign-up _input' type="text" name='name' placeholder='Name' onChange={e => handleInput(e)}/>
                    <strong className='sign-up_errors'>{error_name ? displayError(error_name) : ''}</strong>

                    <input className='sign-up _input' type="text" name='email' placeholder='Email' onChange={e => handleInput(e)}/>
                    <strong className='sign-up_errors'>{error_email ? displayError(error_email) : ''}</strong>

                    <input className='sign-up _input' type="text" name='password' placeholder='Password' onChange={e => handleInput(e)}/>
                    <strong className='sign-up_errors'>{error_password ? displayError(error_password) : ''}</strong>

                    <input className='sign-up _input' type="text" name='password_confirmation' placeholder='Password Confirmation' onChange={e => handleInput(e)}/>
                </div>
                <div className='sign-up_control-wrapper'>
                    <h5 className='sign-up_policy'>
                        Before you sign up, we want to make sure you are aware of our privacy policy.
                        It outlines how we collect and use your personal information, as well as your rights regarding that information.
                        Please read and accept the policy before proceeding with the sign-up process. 
                    </h5>
                    <div className="sign-up_policy-accept">
                        <label className={error_policy ? 'sign-up_check-box-error' : 'sign-up_check-box-none'}>
                            <input className='sign-up_check-box' type="checkbox" name='policy' onClick={e => handleInput(e)}/>
                        </label>
                        <Policy />
                    </div>
                    
                    <button className='sign-up _btn' type='submit'>Sign up</button>
                </div>
            </form>
        </React.Fragment>
     );
}
 
export default SignUp;