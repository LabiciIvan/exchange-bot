import React from 'react';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import CheckAndLogg from '../utilities/CheckAndLogg';

import Nav from './Nav.jsx';
import '../css/nav.css';

const Account = () => {

    const navigate = useNavigate();
    
    const [logged , setLogged] = useState(CheckAndLogg);

    useEffect(() => {
        !logged && navigate("/");
    });


    return ( 
        <React.Fragment>
            <Nav />

            <div>account</div>
        </React.Fragment>

     );
}
 
export default Account;