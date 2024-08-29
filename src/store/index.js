import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import uploadReducer from './uploadSlice'
import chatReducer from './chatSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    uploads:uploadReducer,
    chats:chatReducer
  },
});

export default store;
