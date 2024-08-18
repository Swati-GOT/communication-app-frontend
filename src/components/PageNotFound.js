import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound =() =>{
  return (
    <div className="content-alignment">
      <h1>404: Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link className="link-button" to="/">Go To Home Page</Link>
    </div>
  );
}

export default PageNotFound;
