import { configureStore, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';
// import thunk from 'redux-thunk';

export type RootState = ReturnType<typeof rootReducer>;

type ExtendedPersistsConfig = PersistConfig<RootState> & {
	whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistsConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
	process.env['NODE_ENV'] !== 'production' && logger,
	// thunk,
	sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const enhancers = [...middlewares];

export const store = configureStore({
	reducer: persistedReducer,
	middleware: enhancers,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
