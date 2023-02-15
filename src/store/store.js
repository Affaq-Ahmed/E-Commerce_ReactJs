import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';
// import thunk from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
	process.env.NODE_ENV === 'development' && logger,
	// thunk,
	sagaMiddleware,
].filter(Boolean);

const enhancers = [...middlewares];

export const store = configureStore({
	reducer: persistedReducer,
	middleware: enhancers,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
