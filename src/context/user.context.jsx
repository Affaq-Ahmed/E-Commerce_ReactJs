import { createContext, useEffect, useReducer } from 'react';
import {
	createUserDocumentAuth,
	onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => {},
});

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: 'SET_CURRENT_USER',
	CLEAR_CURRENT_USER: 'CLEAR_CURRENT_USER',
};

const userReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		case USER_ACTION_TYPES.CLEAR_CURRENT_USER:
			return {
				...state,
				currentUser: null,
			};
		default:
			throw new Error(`Unhandled action type: ${type} in userReducer.`);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

	const { currentUser } = state;
	const setCurrentUser = (user) => {
		dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
	};

	const value = {
		currentUser,
		setCurrentUser,
	};

	useEffect(() => {
		onAuthStateChangedListener(() => {
			const unsubscribe = onAuthStateChangedListener((user) => {
				if (user) createUserDocumentAuth(user);
				setCurrentUser(user);
			});

			return unsubscribe;
		});
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
