import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getLoggedInUser, login } from '../../storage/userStorage';
import { getUserById, updateUser } from '../../store/usersSlice';
import { validateEmail } from '../../utils/common';

const EditUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();
    const { email } = getLoggedInUser();
    const [errors, setErrors] = useState({ fullname: "", email: "" });
    const [user, setUser] = useState({ fullname: "", email: "" });

    useEffect(() => {
        dispatch(getUserById(id)).then((response) => {
            setUser(response.payload);
        })
    }, []);

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
        }
        setErrors({ ...errors })

        setUser({ ...user, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user.fullname === '' || user.email === '') {
            alert('All fields are required');
            return false;
        }
        dispatch(updateUser(user)).then(() => {
            if(user.email === email) {
                login(user);
            }
            navigate("/users")
        })
    }

    return (
        <div className='content-alignment'>
            <h4>Edit User Information</h4>
            <form onSubmit={handleSubmit}>
                <table className='edit-table'>
                    <tbody>
                        <tr>
                            <td >
                                <label className="input-label me-2" htmlFor="fullname">Full Name</label>
                            </td>
                            <td>
                                <input className="input-class" type="text" id="fullname" name="fullname" defaultValue={user.fullname} onChange={changeHandler} />
                                <p className='error-message'>{errors.fullname}</p>
                            </td>
                        </tr>

                        {email !== user.email &&
                            <tr>
                                <td >
                                    <label className="input-label" htmlFor="email">Email</label>
                                </td>
                                <td>
                                    <input className="input-class" type="email" id="email" name="email" defaultValue={user.email} onChange={changeHandler} />
                                    <p className='error-message'>{errors.email}</p>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>

                <br></br>
                <input type="submit" value="Save" className="btn btn-primary" />
            </form>
        </div>
    )
}

export default EditUser