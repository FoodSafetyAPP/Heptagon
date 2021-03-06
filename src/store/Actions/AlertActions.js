import { alertConstants } from '../Constants/AlertConstants';

export const alertSuccess = (message) => {
  return { type: alertConstants.SUCCESS, message };
}

export const alertError = (message) => {
  return { type: alertConstants.ERROR, message };
}

export const alertClear = () => {
  return { type: alertConstants.CLEAR };
}