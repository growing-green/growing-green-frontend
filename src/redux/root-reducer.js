import { combineReducers } from '@reduxjs/toolkit';

import user from './modules/user';
import plants from './modules/plants';
import environments from './modules/environments';
import search from './modules/search';

export default combineReducers({
  user,
  plants,
  search,
  environments,
});
