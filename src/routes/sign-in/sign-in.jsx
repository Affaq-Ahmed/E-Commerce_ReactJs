import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';
import {
	auth,
	signInWithGooglePopup,
	signInWithGoogleRedirect,
	createUserDocumentAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	useEffect(() => {
		const logUser = async () => {
			const response = await getRedirectResult(auth);
			if (response) {
				const userDocRef = await createUserDocumentAuth(response.user);
			}
			console.log(response);
		};
		logUser();
	}, []);

	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentAuth(response.user);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
			<button onClick={signInWithGoogleRedirect}>
				Sign in with Google Redirect
			</button>
		</div>
	);
};

export default SignIn;
