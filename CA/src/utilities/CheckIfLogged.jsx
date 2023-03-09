import React from 'react';


const CheckIfLogged = () => {
    const token = localStorage.getItem('TOKEN');
      
    return token ? token : null;
}
 
export default CheckIfLogged;