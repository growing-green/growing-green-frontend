import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiController from '../../configs/apiController';
import { MESSAGES } from '../../constants';

export const loginSuccess = createAsyncThunk(
  'users/login',
  async ({ name, email, photo_url }, { rejectWithValue }) => {
    try {
      const response = await apiController.post('users/login', {
        email,
        name,
        photo_url,
      });

      return response.data;
    } catch {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

const isLogin = localStorage.getItem('token') ? true : false;

export const slice = createSlice({
  name: 'user',
  initialState: {
    info: null,
    error: null,
    isLogin,
  },
  reducers: {
    logoutSuccess: (state) => {
      state.info = null;
      state.isLogin = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginSuccess.fulfilled, (state, action) => {
      state.info = action.payload.user;
      state.isLogin = true;

      localStorage.setItem('token', JSON.stringify(action.payload.token));
    });
    builder.addCase(loginSuccess.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default slice.reducer;

export const { logoutSuccess } = slice.actions;
