import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import auth from './reducers/auth';
import device from './reducers/device';
import attendance from './reducers/attendance';
import companies from './reducers/companies';
import error from './reducers/error';

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
const reducer = combineReducers({
  auth,
  device,
  attendance,
  companies,
  error,
});

const store = createStore(reducer, applyMiddleware(...middlewares));
export default store;
