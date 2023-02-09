import SignUpForm from '../../components/sign-up-form/sign-up-form';
import {
	signInWithGooglePopup,
	createUserDocumentAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentAuth(response.user);
		console.log(userDocRef);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
			<SignUpForm />
		</div>
	);
};

export default SignIn;
