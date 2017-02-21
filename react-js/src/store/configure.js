import { applyMiddleware, combineReducers, createStore } from 'redux';
import createLoggerMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from './modules';

export default function configureStore(initialState) {
  return createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(thunk, createLoggerMiddleware({ collapsed: true })),
  );
}
