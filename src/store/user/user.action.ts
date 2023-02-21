import {
	Action,
	ActionWithPayload,
	createAction,
	withMatcher,
} from '../../utils/reducer/reducer.utils';
import { USER_ACTION_TYPES } from './user.types';
import {
	UserData,
	AdditionalInformation,
} from 'src/utils/firebase/firebase.utils';
import { User } from 'firebase/auth';

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type SetCurrentUser = ActionWithPayload<
	USER_ACTION_TYPES.SET_CURRENT_USER,
	UserData
>;

export type SignInWithEmailAndPassword = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_AND_PASSWORD,
	{
		email: string;
		password: string;
	}
>;

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export type SignInSuccess = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_IN_SUCCESS,
	UserData
>;

export type SignInFailure = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_IN_FAILURE,
	Error
>;

export type SignUpStart = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_UP_START,
	{
		email: string;
		password: string;
		displayName: string;
	}
>;

export type SignUpSuccess = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_UP_SUCCESS,
	{
		user: User;
		additionalData: AdditionalInformation;
	}
>;

export type SignUpFailure = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_UP_FAILURE,
	Error
>;

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailure = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_OUT_FAILURE,
	Error
>;

export const checkUserSession = withMatcher(
	(): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export const setCurrentUser = withMatcher(
	(user: UserData): SetCurrentUser =>
		createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);

export const signInWithEmailAndPassword = withMatcher(
	(email: string, password: string): SignInWithEmailAndPassword =>
		createAction(USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_AND_PASSWORD, {
			email,
			password,
		})
);

export const googleSignInStart = withMatcher(
	(): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export const signInSuccess = withMatcher(
	(user: UserData & { id: string }): SignInSuccess =>
		createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const signInFailure = withMatcher(
	(error: Error): SignInFailure =>
		createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error)
);

export const signUpStart = withMatcher(
	(email: string, password: string, displayName: string): SignUpStart =>
		createAction(USER_ACTION_TYPES.SIGN_UP_START, {
			email,
			password,
			displayName,
		})
);

export const signUpSuccess = withMatcher(
	(user: User, additionalData: AdditionalInformation): SignUpSuccess =>
		createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalData })
);

export const signUpFailure = withMatcher(
	(error: Error): SignUpFailure =>
		createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error)
);

export const signOutStart = withMatcher(
	(): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
	(): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);

export const signOutFailure = withMatcher(
	(error: Error): SignOutFailure =>
		createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error)
);
