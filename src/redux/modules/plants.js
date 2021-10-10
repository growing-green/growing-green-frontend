import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiController from '../../configs/apiController';
import { MESSAGES } from '../../constants';

export const fetchAllPlant = createAsyncThunk(
  'plants/fetchAllPlant',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiController.get('plants');

      return response.data;
    } catch (err) {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

export const slice = createSlice({
  name: 'user',
  initialState: {
    allPlant: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPlant.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllPlant.fulfilled, (state, action) => {
      state.allPlant = action.payload;
    });
    builder.addCase(fetchAllPlant.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default slice.reducer;

export const { logoutSuccess } = slice.actions;
