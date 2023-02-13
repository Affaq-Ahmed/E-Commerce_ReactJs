import { applyMiddleware, compose, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

const middlewares = [logger];

const enhancers = compose(applyMiddleware(...middlewares));

export const store = configureStore({
	reducer: rootReducer,
	middleware: enhancers,
});
