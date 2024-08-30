// src/features/users/usersSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../storage/userStorage';
import { handleErrorResponse } from '../utils/common';

const baseUrl = `${process.env.REACT_APP_API_URL}/chats`;

export const fetchChats = createAsyncThunk('chats/fetchChats', async () => {
    try {
        const response = await axios.get(baseUrl, {
            headers: { 'Authorization': `${getToken()}` }
        });
        return response.data;
    } catch (error) {
        return handleErrorResponse(error)
    }
});


export const createChat = createAsyncThunk('chats/createChat', async (chat) => {
    try {
        const response = await axios.post(baseUrl, chat, {
            headers: { 'Authorization': `${getToken()}` }
        });
        return response.data;
    } catch (error) {
        return handleErrorResponse(error)
    }
});


const chatSlice = createSlice({
    name: 'chats',
    initialState: {
        loading: false,
        users: [],
        user: {},
        error: null,
    },
    reducers: {},
});

export default chatSlice.reducer;