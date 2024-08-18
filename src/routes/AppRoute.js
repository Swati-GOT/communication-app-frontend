import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../components/login';
import Menu from '../components/menu';
import Welcome from '../components/welcome';
import Register from '../components/users/register';
import User from '../components/users/users';
import Upload from '../components/upload/uploads';
import Chat from '../components/chat/chats';
import EditUser from '../components/users/editUser';
import ProtectedRoute from './ProtectedRoute';
import LoginSuccess from '../components/loginSuccess';
import RegisterSuccess from '../components/users/registerSuccess';
import PageNotFound from '../components/PageNotFound';
const AppRoute = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/" element={<Menu />}>
                    <Route
                        path="users"
                        element={<ProtectedRoute element={User}/>}
                    />
                    <Route
                        path="users/edituser/:id"
                        element={<ProtectedRoute element={EditUser}/>}
                    />
                    <Route
                        path="uploads"
                        element={<ProtectedRoute element={Upload} />}
                    />
                    <Route
                        path="chats"
                        element={<ProtectedRoute element={Chat}/>}
                    />
                    <Route
                        path="login-success"
                        element={<ProtectedRoute element={LoginSuccess}/>}
                    />
                </Route>
                <Route path="*" element={<PageNotFound />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="register-success" element={<RegisterSuccess />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute;
