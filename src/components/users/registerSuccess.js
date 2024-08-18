import React from 'react';
import { Link } from 'react-router-dom';

const RegisterSuccess =() =>{
 
  return (
    <div className='content-alignment'>
    <h4 className='header-font'>Registration Successful</h4>
    <p>Thank you for your registration</p> 
    <p><Link to={"/"}>Click to return to home page</Link></p>
    </div>
  )
}

export default RegisterSuccess