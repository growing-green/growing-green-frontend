import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

let middleware;

if (process.env.NODE_ENV !== 'production') {
  middleware = [thunk];
} else {
  middleware = [logger, thunk];
}

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
