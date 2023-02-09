import { createContext, useState, useEffect } from 'react';
import {
	createUserDocumentAuth,
	onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => {},
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

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
