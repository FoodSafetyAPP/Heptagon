import { userConstants } from '../Constants/UserConstants';
import { alertError, alertClear, alertSuccess } from "./AlertActions";
import { history } from "../../helpers/history";
import { store } from "../Store";
import axios from "axios";

export const login_failure = () => {
  store.dispatch({ type: userConstants.LOGIN_FAILURE });
  store.dispatch(alertError("Username or password is incorrect !"));
  setTimeout(() => {
    store.dispatch(alertClear());
  }, 1000);
}

export const logout_failure = () => {
  localStorage.removeItem("access_token");
  store.dispatch({ type: userConstants.LOGOUT });
  history.replace('/login');
}

export const login = (username, password) => {
  return dispatch => {
    axios
      .post('/login-user?email=' + username + '&password=' + password)
      .then((res) => {
        if (res.data.success === true) {
          localStorage.setItem("access_token", res.data.authenticated_data);
          dispatch({ type: userConstants.LOGIN_SUCCESS });
          dispatch(alertSuccess("Logged in Successfully !"));
          setTimeout(() => {
            dispatch(alertClear());
            history.replace('/');
          }, 1000);
        } else {
          login_failure();
        }
      })
      .catch(() => {
        login_failure();
      });
  };
}

export const logout = () => {
  const headers = {
    'Content-Type': 'application/json',
    "authorization": `Bearer ${localStorage.getItem("access_token")}`
  };
  return dispatch => {
    axios
      .get('/logout-user', { headers })
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          logout_failure();
        } else {
          logout_failure();
        }
      })
      .catch(() => {
        logout_failure();
      });
  }
}

export const updateList = (data) => {
  return dispatch => {
    dispatch({ type: userConstants.UPDATE_LIST, payload: data });
  }
}