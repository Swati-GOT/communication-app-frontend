import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createUser } from '../../store/usersSlice';
import { validateEmail } from '../../utils/common';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({ id: Number(new Date()), fullname: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ fullname: "", email: "", password: "", confirmPassword: "" });

  const changeHandler = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "fullname":
        errors.fullname = (value === '') ? 'Name cannot be blank' : "";
        break;
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
      case "confirmPassword":
        errors.confirmPassword = (value === '') ? 'Password cannot be blank' : "";
        break;
    }
    setErrors({ ...errors })
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user.fullname === '' || user.email === '' || user.password === '' || user.confirmPassword === '') {
      alert('All fields are required');
      return false;
    }

    if (user.password != user.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    dispatch(createUser(user)).then(() => {
      navigate("/register-success")
    }).catch((error) => {
      alert(error)
    })
  }

  return (
    <div className='content-alignment'>
      <h4>Register</h4>
      <form onSubmit={handleSubmit}>
        <table className='edit-table'>
          <tbody>
            <tr>
              <td >
                <label className="input-label me-2" htmlFor="fullname">Full Name</label>
              </td>
              <td>
                <input className="input-class" type="text" id="fullname" name="fullname" onChange={changeHandler} />
                <p className='error-message'>{errors.fullname}</p>
              </td>
            </tr>

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

            <tr>
              <td >
                <label className="input-label" htmlFor="confirm-password">Confirm Password</label>
              </td>
              <td>
                <input className="input-class" type="password" id="confirm-password" name="confirmPassword" onChange={changeHandler} />
                <p className='error-message'>{errors.confirmPassword}</p>
              </td>
            </tr>

          </tbody>
        </table>

        <br></br>
        <input type="submit" value="Save" className="btn btn-primary" />
      </form>
    </div>
  )
}

export default Register