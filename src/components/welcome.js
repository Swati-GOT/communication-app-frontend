import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Welcome = () => {
  const location = useLocation();
  let isLoggedOut = false;

  if (location?.state?.isLoggedOut) {
    isLoggedOut = true
  }

  return (
    <>
      <div className="content-alignment">
        <h3>Welcome to Users Module</h3>
        <p>Existing Users</p>
        <Link className="link-button" to="/login">Login</Link>
        <br></br>
        <p>New Users</p>
        <Link className="link-button" to="/register">Register</Link>
        <br></br>
        {isLoggedOut && <p>You have been logged out</p>}
      </div>
    </>
  )
}

export default Welcome;
