import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiController from '../../configs/apiController';
import { MESSAGES } from '../../constants';

export const getAllPlantsByUserId = createAsyncThunk(
  'plants/fetchAllPlants',
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
  name: 'plants',
  initialState: {
    allPlants: {},
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPlantsByUserId.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllPlantsByUserId.fulfilled, (state, action) => {
      action.payload.forEach((plant) => {
        state.allPlants[plant._id] = plant;
      });

      state.isLoading = false;
    });
    builder.addCase(getAllPlantsByUserId.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default slice.reducer;

export const { logoutSuccess } = slice.actions;
