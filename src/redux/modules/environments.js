import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MESSAGES } from '../../constants';
import axios from 'axios';
import { convertKelvinToCelsius } from '../../utils/convertKelvinToCelsius';
import getHours from 'date-fns/getHours';
import { isDay } from '../../utils/isDay';
import { setWeather } from '../../utils/setWeather';

export const getCurrentWeather = createAsyncThunk(
  'environments/getCurrentWeather',
  async (_, { rejectWithValue }) => {
    try {
      const apiURL = process.env.REACT_APP_WEATHER_API_URL;
      const response = await axios.get(apiURL);
      return response.data;
    } catch (err) {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

export const slice = createSlice({
  name: 'environments',
  initialState: {
    weather: '',
    temperature: '',
    isDay: isDay(getHours(new Date())),
    iconPath: '',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      const { main, weather } = action.payload;

      state.weather = setWeather(weather[0].main);
      state.iconPath = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
      state.temperature = convertKelvinToCelsius(main.temp);
    });

    builder.addCase(getCurrentWeather.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default slice.reducer;
