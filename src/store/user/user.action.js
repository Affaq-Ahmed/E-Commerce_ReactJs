import { createAction } from '../../utils/reducer/reducer.utils';
import { USER_ACTION_TYPES } from './user.types';

export const setCurrentUser = (user) =>
	createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () =>
	createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const signInWithEmailAndPassword = (email, password) =>
	createAction(USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_AND_PASSWORD, {
		email,
		password,
	});

export const signOutStart = () =>
	createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
	createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailure = (error) =>
	createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error);

export const googleSignIn = () =>
	createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN);

export const signInSuccess = (user) =>
	createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailure = (error) =>
	createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);

export const signUpStart = (email, password, displayName) =>
	createAction(USER_ACTION_TYPES.SIGN_UP_START, {
		email,
		password,
		displayName,
	});

export const signUpSuccess = ({ user, additionalData }) =>
	createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalData });

export const signUpFailure = (error) =>
	createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error);
