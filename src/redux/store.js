import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import user from './modules/user';

const reducer = combineReducers({
  user,
});

const store = configureStore({
  reducer,
});

export default store;
