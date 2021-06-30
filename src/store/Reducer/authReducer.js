import { userConstants } from '../Constants/UserConstants';

const initialState = { loggedIn: false };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false
      };
    case userConstants.LOGOUT:
      return {
        loggedIn: false
      };
    default:
      return state
  }
}