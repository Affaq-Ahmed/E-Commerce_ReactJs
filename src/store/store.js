import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

const loggerMiddleware = (store) => (next) => (action) => {
	if (!action.type) {
		return next(action);
	}

	console.log(
		'type: ',
		action.type,
		'\npayload: ',
		action.payload,
		'\nstate: ',
		store.getState()
	);

	next(action);

	console.log('next state: ', store.getState());
};

const middlewares = [loggerMiddleware, logger];

const enhancers = [...middlewares];

export const store = configureStore({
	reducer: rootReducer,
	middleware: enhancers,
});
