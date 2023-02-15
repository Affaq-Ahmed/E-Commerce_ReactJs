import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(
	Boolean
);

// const composeEnhancer =
// 	(process.env.NODE_ENV !== 'production' &&
// 		window &&
// 		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
// 	compose;

// const enhancers = composeEnhancer(...middlewares);

const enhancers = [...middlewares];

export const store = configureStore({
	reducer: persistedReducer,
	middleware: enhancers,
});

export const persistor = persistStore(store);
