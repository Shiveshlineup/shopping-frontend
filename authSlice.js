import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  loading: false,
  error: null,
};

// Signup user
export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/auth/register', userData);
    localStorage.setItem('userInfo', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'An error occurred.');
  }
});

// Login user
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    localStorage.setItem('userInfo', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'An error occurred.');
  }
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('userInfo');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
      });
  },
});

export default authSlice.reducer;