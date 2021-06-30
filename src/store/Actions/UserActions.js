import { userConstants } from '../Constants/UserConstants';
import { userLogin } from "../../middleware/UserMiddleware";
import { alertError, alertClear, alertSuccess } from "./AlertActions";
import { history } from "../../helpers/history";

export const login = (username, password) => {
  return dispatch => {
    userLogin(username, password)
      .then(
        msg => {
          dispatch({ type: userConstants.LOGIN_SUCCESS });
          dispatch(alertSuccess(msg));
          setTimeout(() => {
            dispatch(alertClear());
            history.replace('/');
          }, 1000);
        },
        error => {
          dispatch({ type: userConstants.LOGIN_FAILURE });
          dispatch(alertError(error));
          setTimeout(() => {
            dispatch(alertClear());
          }, 1000);
        }
      );
  };
}

export const logout = () => {
  return dispatch => {
    dispatch({ type: userConstants.LOGOUT });
    history.replace('/login');
  }
}

export const updateList = (data) => {
  return dispatch => {
    dispatch({ type: userConstants.UPDATE_LIST, payload: data });
  }
}