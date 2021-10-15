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

export const createNewPlant = createAsyncThunk(
  'plants/createNewPlant',
  async (
    { history, name, species, type, isSunPlant, watering, growthStage },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await apiController.post('plants/new', {
        name,
        species,
        type,
        isSunPlant,
        watering,
        growthStage,
      });

      dispatch(getAllPlantsByUserId());

      const { plant } = response.data;
      history.push(`/plants/${plant._id}`);

      return plant;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updatePlant = createAsyncThunk(
  'plants/updatePlant',
  async ({ plantId, data }, { rejectWithValue }) => {
    try {
      const response = await apiController.put(`plants/${plantId}`, data);

      return response.data;
    } catch (err) {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

export const updateAllPlant = createAsyncThunk(
  'plants/UpdatePlantAll',
  async (plant, { rejectWithValue }) => {
    try {
      const response = await apiController.put(`plants`, plant);

      return response.data;
    } catch (err) {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

export const deletePlant = createAsyncThunk(
  'plants/deletePlant',
  async (plantId, { rejectWithValue }) => {
    try {
      const response = await apiController.delete(`plants/${plantId}`);

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

    builder.addCase(createNewPlant.fulfilled, (state, action) => {
      const plant = action.payload;
      console.log('plant', plant);
      state.allPlants[plant._id] = plant;
    });

    builder.addCase(createNewPlant.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(updatePlant.fulfilled, (state, action) => {
      const { plant } = action.payload;

      state.allPlants[plant._id] = plant;
    });

    builder.addCase(updatePlant.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default slice.reducer;
