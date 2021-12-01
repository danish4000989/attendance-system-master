import { AUTH_LOADING, ERROR, ADMIN_LOGIN, LOGOUT } from '../types';

let initialState = {
  loading: false,
  adminId: null,
  message: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_LOGIN:
      return {
        ...state,
        adminId: payload,
        loading: false,
      };

    case ERROR:
      return {
        ...state,
        loading: false,
      };
    case AUTH_LOADING:
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

export default auth;
