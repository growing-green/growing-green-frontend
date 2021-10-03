import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiController from '../../configs/apiController';

export const signInSuccess = createAsyncThunk(
  'users/login',
  async ({ name, email, photo_url }) => {
    try {
      const data = apiController({
        url: '/users/login',
        method: 'post',
        data: {
          email,
          name,
          photo_url,
        },
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
    loading: false,
    error: null,
  },
  reducers: {
    signOutSuccess: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: {
    [signInSuccess.pending]: (state) => {
      state.loading = true;
      state.user = initialUser;
      state.error = null;
    },
    [signInSuccess.fullfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.error = null;
    },
    [signInSuccess.rejected]: (state, action) => {
      state.loading = false;
      state.user = initialUser;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

export const { signOutSuccess } = slice.actions;
