import { combineReducers } from '@reduxjs/toolkit';

import user from './modules/user';
import plants from './modules/plants';
import loading from './modules/loading';
import environments from './modules/environments';

export default combineReducers({
  user,
  plants,
  loading,
  environments,
});
