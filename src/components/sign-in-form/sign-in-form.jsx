import { useState } from 'react';
import {
	createUserDocumentAuth,
	signInWithGooglePopup,
	signInWithEmailAndPasswordAuth,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button';
import FormInput from '../form-input/form-input';

import './sign-in-form.styles.scss';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInWithEmailAndPasswordAuth(email, password);
			setFormFields(defaultFormFields);
		} catch (error) {
			if (error.code === 'auth/user-not-found') {
				alert('Cannot Sign In', 'User not found.');
				console.log('User not found.');
			} else if (error.code === 'auth/wrong-password')
				alert('Cannot Sign In', 'Wrong password.');
			console.error('User Sign In Error', error);
		}
	};

	const signInGoogleUser = async () => {
		await signInWithGooglePopup();
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-in-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your Email and Password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					name='email'
					id='email'
					required
					onChange={handleChange}
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					name='password'
					id='password'
					required
					onChange={handleChange}
					value={password}
					minLength='3'
				/>

				<div className='buttons-container'>
					<Button type='submit' buttonType='primary'>
						Sign In
					</Button>

					<Button type='button' buttonType='google' onClick={signInGoogleUser}>
						Google sign in
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
