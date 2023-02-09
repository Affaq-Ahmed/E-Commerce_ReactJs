import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCwmUUFE0XkSlGfePB3gtHAOPvtKs49Ymo',
	authDomain: 'e-commerce-shop-react-779c5.firebaseapp.com',
	projectId: 'e-commerce-shop-react-779c5',
	storageBucket: 'e-commerce-shop-react-779c5.appspot.com',
	messagingSenderId: '1131799780',
	appId: '1:1131799780:web:387bf5a35d1634455338f1',
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentAuth = async (
	userAuth,
	additionalInformation
) => {
	if (!userAuth) return;

	const userRef = doc(db, `users/${userAuth.uid}`);
	const userSnapShot = await getDoc(userRef);

	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log('error creating user on db', error.message);
		}
	}

	return userRef;
};

export const createUserWithEmailAndPasswordAuth = async (email, password) => {
	if (!email || !password) return;

	try {
		return await createUserWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.log('User Creation Failed E&P', error);
	}
};

export const signInWithEmailAndPasswordAuth = async (email, password) => {
	if (!email || !password) return;

	try {
		return await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.log('User Sign In Failed E&P', error);
	}
};

export const signOutAuth = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.log('Sign Out Failed', error);
	}
};

export const onAuthStateChangedListener = async (callback) => {
	return onAuthStateChanged(auth, (user) => {
		if (user) {
			callback(user);
		} else {
			callback(null);
		}
	});
};
