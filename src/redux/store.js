import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// set up our middlewares - add more as needed
const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;