import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from '../components/chat/chats';
import Login from '../components/login';
import LoginSuccess from '../components/loginSuccess';
import Menu from '../components/menu';
import PageNotFound from '../components/PageNotFound';
import Upload from '../components/upload/uploads';
import EditUser from '../components/users/editUser';
import Register from '../components/users/register';
import RegisterSuccess from '../components/users/registerSuccess';
import User from '../components/users/users';
import Welcome from '../components/welcome';
import ProtectedRoute from './ProtectedRoute';
const AppRoute = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/" element={<Menu />}>
                    <Route
                        path="users"
                        element={<ProtectedRoute element={User} />}
                    />
                    <Route
                        path="users/edituser/:id"
                        element={<ProtectedRoute element={EditUser} />}
                    />
                    <Route
                        path="uploads"
                        element={<ProtectedRoute element={Upload} />}
                    />
                    <Route
                        path="chats"
                        element={<ProtectedRoute element={Chat} />}
                    />
                    <Route
                        path="login-success"
                        element={<ProtectedRoute element={LoginSuccess} />}
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
