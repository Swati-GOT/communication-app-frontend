import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../storage/userStorage';
import { handleErrorResponse } from '../utils/common';

// Base API URL
const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(baseUrl, {
            headers: {
                'Authorization': `${getToken()}`,
            }
        });
        return response.data;
    } catch (error) {
        return handleErrorResponse(error)
    }
});

// Create a new user
export const createUser = createAsyncThunk('users/createUser', async (newUser) => {
    const response = await axios.post(baseUrl, newUser);
    return response.data;
});

// Update an existing user
export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser) => {
    const { id, ...rest } = updatedUser;
    const response = await axios.put(`${baseUrl}/${id}`, rest, {
        headers: {
            'Authorization': `${getToken()}`
        }
    }
    );
    return response.data;
});

export const getUserById = createAsyncThunk('users/getUserById', async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`, {
        headers: {
            'Authorization': `${getToken()}`
        }
    });
    return response.data;
})

// Delete a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            'Authorization': `${getToken()}`
        }
    });
    return id;
});

export const loginUser = createAsyncThunk('loginUser', async (user) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, user);
        return response.data;
    } catch (error) {
        return error
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        users: [],
        user: {},
        error: null,
    },
    reducers: {},
});

export default usersSlice.reducer;