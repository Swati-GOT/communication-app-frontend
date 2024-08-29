
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../storage/userStorage';
import { handleErrorResponse } from '../utils/common';

// Base API URL
const baseUrl = `${process.env.REACT_APP_API_URL}/uploads`;

// Fetch all uploads
export const fetchuploads = createAsyncThunk('uploads/fetchUploads', async () => {
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

// Create a new upload
export const createUploads = createAsyncThunk('/createuploads', async (newUpload) => {
    const response = await axios.post(baseUrl, newUpload,{
        headers:{
            "Content-Type": "multipart/form-data",
            'Authorization': `${getToken()}`,
        }
    });
    return response.data;
});

// Update an existing uploads
export const updateUploads = createAsyncThunk('uploads/updateUpload', async (updatedData) => {
    const { id, formData } = updatedData;
    
    const response = await axios.put(`${baseUrl}/${id}`, formData, {
        headers:{
            "Content-Type": "multipart/form-data",
            'Authorization': `${getToken()}`,
        }
    }
    );
    return response.data;
    return null;
});

export const getUploadById = createAsyncThunk('uploads/getUploadById', async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`, {
        headers: {
            'Authorization': `${getToken()}`
        }
    });
    return response.data;
})

export const downloadFile = createAsyncThunk('uploads/download', async (file_name) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/download/${file_name}`, {
        headers: {
            'Authorization': `${getToken()}`
        }
    });
    return response.data;
})

// Delete a Upload
export const deleteUpload = createAsyncThunk('uploads/deleteUpload', async (id) => {
    await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            'Authorization': `${getToken()}`
        }
    });
    return id;
});

const uploadSlice = createSlice({
    name: 'uploads',
    initialState: {
        loading: false,
        uploads: [],
        user: {},
        error: null,
    },
    reducers: {},
});

export default uploadSlice.reducer;