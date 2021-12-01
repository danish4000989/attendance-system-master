import { ERROR, LOADING_ATTENDANCE, LOGOUT, MARK_ATTENDANCE } from '../types';

const initialState = {
  loading: false,
  message: undefined,
};

const device = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MARK_ATTENDANCE:
      return {
        ...state,
        message: payload,
        loading: false,
      };

    case LOADING_ATTENDANCE:
      return {
        ...state,
        loading: payload,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default device;
