import {
  LOADING_COMPANY,
  LOGOUT,
  GET_COMPANIES,
  SET_COMPANY,
  ERROR,
} from '../types';

const initialState = {
  loading: false,
  list: [],
  company: undefined,
};

const companies = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COMPANIES:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case SET_COMPANY:
      return {
        ...state,
        company: payload,
      };
    case LOADING_COMPANY:
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

export default companies;
