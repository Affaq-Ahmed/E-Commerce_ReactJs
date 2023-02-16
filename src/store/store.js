import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';

// const persistConfig = {
// 	key: 'root',
// 	storage,
// 	blacklist: ['user'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(
	Boolean
);

// const enhancers = [...middlewares];

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(middlewares),
});

// export const persistor = persistStore(store);
