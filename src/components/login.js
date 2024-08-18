import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { validateEmail } from '../utils/common';

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ });
  const [errors, setErrors] = useState({  });

  const changeHandler = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "email":
        if (!value) {
          errors.email = (value === '') ? 'Email cannot be blank' : "";
          break;
        } else if (!validateEmail(value)) {
          errors.email = `Email format is invalid`
        } else {
          errors.email = "";
        }
        break;
      case "password":
        errors.password = (value === '') ? 'Password cannot be blank' : "";
        break;
    }
    setErrors({ ...errors })
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if( user.email === '' || user.password === ''){
      alert('All fields are required');
      return false;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loginUser = users.find(function (item) {
        return user.email === item.email && user.password === item.password;
    });
    console.log(user)
    if (loginUser) {
        localStorage.setItem("loginUser", JSON.stringify(loginUser));
        navigate("/login-success",{ state: { user } });
    } else {
        alert("Invalid email or password");
    }
    
  }

  return (
    <div className='content-alignment'>
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <table className='edit-table'>
          <tbody>
            <tr>
              <td >
                <label className="input-label" htmlFor="email">Email</label>
              </td>
              <td>
                <input className="input-class" type="email" id="email" name="email" onChange={changeHandler} />
                <p className='error-message'>{errors.email}</p>
              </td>
            </tr>

            <tr>
              <td >
                <label className="input-label" htmlFor="password">Password</label>
              </td>
              <td>
                <input className="input-class" type="password" id="password" name="password" onChange={changeHandler} />
                <p className='error-message'>{errors.password}</p>
              </td>
            </tr>

          </tbody>
        </table>

        <br></br>
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
    </div>
  )
}

export default Login