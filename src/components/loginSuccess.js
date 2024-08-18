import React from 'react'
import { useLocation } from 'react-router-dom';

const LoginSuccess =() =>{
    const location = useLocation();
    console.log("state...",location.state)
    const { email } = location.state.user || {};

  return (
    <div className='content-alignment'>
    <h4 className='header-font'>Login Successful</h4>
    <p>Welcome ! <span>{email}</span></p> 
    </div>
  )
}

export default LoginSuccess