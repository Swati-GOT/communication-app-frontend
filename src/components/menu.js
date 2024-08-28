import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Button } from '@mui/material';
import '../css/Navbar.css';
import NavItem from 'react-bootstrap/esm/NavItem';
import { deleteLocalStorage } from '../storage/userStorage';
const Menu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        deleteLocalStorage();
        navigate("/", { state: { isLoggedOut: true } });
    }

    return (<div>
        <Nav fill variant="tabs">
            <NavItem>
                <NavLink to="/chats" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Group Chat</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Manage Users</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/uploads" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Manage Uploads</NavLink>
            </NavItem>
            <NavItem >
                <Button onClick={() => handleLogout()}>
                    Logout
                </Button>
            </NavItem>
        </Nav>
        <div className="container">
            <Outlet />
        </div>
    </div>
    )
}

export default Menu;