import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiController from '../../configs/apiController';

export const loginSuccess = createAsyncThunk(
  'users/login',
  async ({ name, email, photo_url }) => {
    try {
      const { data } = await apiController.post('users/login', {
        email,
        name,
        photo_url,
      });

      return data;
    } catch (err) {
      return err.message;
    }
  },
);

const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export const slice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
    isLoading: false,
    error: null,
  },
  reducers: {
    logoutSuccess: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: {
    [loginSuccess.pending]: (state) => {
      state.isLoading = true;
      state.user = initialUser;
      state.error = null;
    },
    [loginSuccess.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;

      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    [loginSuccess.rejected]: (state, action) => {
      state.isLoading = false;
      state.user = initialUser;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

export const { logoutSuccess } = slice.actions;
