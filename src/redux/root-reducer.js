import { combineReducers } from '@reduxjs/toolkit';

import user from './modules/user';
import plants from './modules/plants';
import loading from './modules/loading';

export default combineReducers({
  user,
  plants,
  loading,
});
