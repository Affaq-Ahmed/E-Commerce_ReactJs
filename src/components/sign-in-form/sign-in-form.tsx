import { AuthError, AuthErrorCodes } from 'firebase/auth';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	googleSignInStart,
	signInWithEmailAndPassword,
} from '../../store/user/user.action';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button';
import FormInput from '../form-input/form-input';

import './sign-in-form.styles.scss';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const dispatch = useDispatch();

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			dispatch(signInWithEmailAndPassword(email, password));
			setFormFields(defaultFormFields);
		} catch (error: any) {
			if ((error as AuthError).code === AuthErrorCodes.USER_DELETED) {
				alert('Cannot Sign-in User not found.');
			} else if ((error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD)
				alert('Cannot Sign-in Wrong password.');
		}
	};

	const signInGoogleUser = async () => {
		dispatch(googleSignInStart());
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
					id='si-email'
					required
					onChange={handleChange}
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					name='password'
					id='si-password'
					required
					onChange={handleChange}
					value={password}
					minLength={3}
				/>

				<div className='buttons-container'>
					<Button type='submit' buttonType={BUTTON_TYPE_CLASSES.primary}>
						Sign In
					</Button>

					<Button
						type='button'
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={signInGoogleUser}
					>
						Google sign in
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
