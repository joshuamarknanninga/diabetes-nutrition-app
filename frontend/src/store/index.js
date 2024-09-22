// src/store/index.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { scanReducer } from './reducers/scanReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  scans: scanReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
