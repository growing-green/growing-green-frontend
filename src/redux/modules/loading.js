import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const slice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingStateChange: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default slice.reducer;

export const { loadingStateChange } = slice.actions;
