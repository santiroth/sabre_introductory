import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const configureStore = initialState =>
  createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk),
  );

export default configureStore;
