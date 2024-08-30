import Cookies from 'js-cookie';

export const createUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

export const updateUser = (user) => {
    const users = getUsers();
    const index = users.findIndex(u => u.id == user.id);
    if (index > -1) {
        users[index] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

export const deleteUser = (id) => {
    const users = getUsers();
    const index = users.findIndex(u => u.id == id);
    if (index > -1) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

export const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

export const getLoggedInUser = () => {
    const loginUser = localStorage.getItem('loginUser');
    return loginUser ? JSON.parse(loginUser) : {};
}

export const login = (user) => {
    const loginUser = localStorage.setItem("loginUser", JSON.stringify(user));
    return loginUser ? JSON.parse(loginUser) : {};
}

export const deleteLocalStorage = () => {
    localStorage.removeItem('loginUser');
    deleteCookieData('token');
}

export const setCookieData = (key, value) => {
    Cookies.set(key, value, { expires: 1 });
}

export const getCookieData = (key) => {
    return Cookies.get(key);
}

export const deleteCookieData = (key) => {
    Cookies.remove(key);
}

export const getToken = () => {
    return getCookieData("token");
}

