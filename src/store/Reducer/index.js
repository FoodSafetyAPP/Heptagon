import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { alertReducer } from './alertReducer';

const RootReducer = combineReducers({
  auth: authReducer,
  notify: alertReducer,
});

export default RootReducer;
