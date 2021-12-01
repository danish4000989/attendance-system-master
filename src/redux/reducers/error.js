import { CLEAR_ERROR, ERROR } from '../types';

const initialState = {
  message: null,
};

const error = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ERROR:
      return {
        ...state,
        ...payload,
      };

    case CLEAR_ERROR:
      return initialState;

    default:
      return state;
  }
};

export default error;
