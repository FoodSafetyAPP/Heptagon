import { alertConstants } from '../Constants/AlertConstants';

const initialState = { type: "", message: "" };

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {
        type: '',
        message: ''
      };
    default:
      return state
  }
}