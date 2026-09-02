import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const extractErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return 'Server took too long to respond. Render free tier may be waking up (please wait ~30s and try again).';
  }
  if (error.message === 'Network Error' || !error.response) {
    return 'Unable to reach backend server. Please ensure the Render service is running and VITE_API_URL is configured on Netlify.';
  }
  return error.message || 'Authentication failed';
};

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

export const register = createAsyncThunk('auth/register', async ({ name, email, password }, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (userData, thunkAPI) => {
  try {
    const { data } = await api.put('/auth/profile', userData);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.userInfo = action.payload; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; state.userInfo = action.payload; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateProfile.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateProfile.fulfilled, (state, action) => { state.loading = false; state.userInfo = action.payload; })
      .addCase(updateProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
