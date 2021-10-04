import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import user from './modules/user';

const reducer = combineReducers({
  user,
});

const store = configureStore({
  reducer,
  middleware: [logger],
});

export default store;