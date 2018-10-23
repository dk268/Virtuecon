import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';

const reducer = combineReducers({ user });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export const UNASKED = `UNASKED`;
export const LOADING = `LOADING`;
export const LOADED = `LOADED`;
export const ERROR = `ERROR`;

export const aCF = (type, payload) => ({ type, payload });

export default store;
export * from './user';
