import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
	process.env.NODE_ENV === 'development' && logger,
	thunk,
].filter(Boolean);

const enhancers = [...middlewares];

export const store = configureStore({
	reducer: persistedReducer,
	middleware: enhancers,
});

export const persistor = persistStore(store);
