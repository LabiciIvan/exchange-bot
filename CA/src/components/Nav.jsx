import React from 'react';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import CheckAndLogg from '../utilities/CheckAndLogg';

import '../css/nav.css'

const Nav = () => {

   const navigate = useNavigate();

   const logOut = () => {
      localStorage.removeItem('TOKEN');
      navigate("/");
   }

   const [logged, setLogged] = useState(CheckAndLogg);


   const renderGuest = () => {
      if (!logged) {
         return <React.Fragment>
                  <Link className="nav-btn" to={'/sign-up'}>Sign up</Link>
                  <Link className="nav-btn" to={'/sign-in'}>Sign in</Link>
                </React.Fragment>
      } else {
         return <React.Fragment>
                  <a className='nav-btn out' onClick={logOut}>Sign Out</a>
                  <Link className="nav-btn" to={'/account'}>Account</Link>
               </React.Fragment>
      }
   }

    return ( 
        <div className="nav-EB">
           <Link className="nav-btn" to={'/'}>HOME</Link>
           {renderGuest()}
        </div>
     );
}
 
export default Nav;