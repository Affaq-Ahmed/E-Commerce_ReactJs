import { useState } from 'react';

import {
	createUserDocumentAuth,
	createUserWithEmailAndPasswordAuth,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button';
import FormInput from '../form-input/form-input';

import './sign-up-form.styles.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}

		try {
			const { user } = await createUserWithEmailAndPasswordAuth(
				email,
				password
			);

			await createUserDocumentAuth(user, { displayName });
			setFormFields(defaultFormFields);
		} catch (error) {
			if (error.code === 'auth/email-already-in-use')
				alert('Cannot create User', 'Email already in use.');
			else console.error('User Creation Error', error);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your Email and Password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='DisplayName'
					type='text'
					name='displayName'
					id='displayName'
					required
					onChange={handleChange}
					value={displayName}
				/>

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

				<FormInput
					label='Confirm Password'
					type='password'
					name='confirmPassword'
					id='confirmPassword'
					required
					onChange={handleChange}
					value={confirmPassword}
					minLength='3'
				/>

				<Button type='submit' buttonType='primary'>
					Sign Up
				</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
