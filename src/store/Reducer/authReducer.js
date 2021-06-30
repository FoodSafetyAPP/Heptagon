import { userConstants } from '../Constants/UserConstants';

const initialState = { loggedIn: false, dataList: [] };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        loggedIn: false
      };
    case userConstants.UPDATE_LIST:
      return {
        ...state,
        dataList: action.payload
      };
    default:
      return state
  }
}