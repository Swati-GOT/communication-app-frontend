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

export const getUsers = ()=> {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

export const getLoggedInUser=()=>{
    const loginUser = localStorage.getItem('loginUser');
    return loginUser ? JSON.parse(loginUser) : {};
}

export const login=(loginUser)=>{
    const loginUser = localStorage.setItem("loginUser", JSON.stringify(loginUser));
    return loginUser ? JSON.parse(loginUser) : {};
}

export const deleteLocalStorage=()=>{
    localStorage.removeItem('loginUser');
}

