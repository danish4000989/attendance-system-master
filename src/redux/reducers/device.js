import {
  REGISTER_DEVICE,
  LOGOUT,
  DEVICE_LOADING,
  DEVICE_INFO,
  ERROR,
} from '../types';

const initialState = {
  loading: false,
  info: undefined,
  deviceId: 0,
};

const device = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DEVICE_INFO:
      return {
        ...state,
        info: payload,
        loading: false,
      };
    case REGISTER_DEVICE:
      return {
        ...state,
        deviceId: payload,
        loading: false,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
      };
    case DEVICE_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default device;
