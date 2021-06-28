import { combineReducers } from 'redux';
import auth from './auth';
import ui from './ui';
import users from './user';

export default combineReducers({
  auth,
  ui,
  users,
});
