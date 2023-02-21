import { User, UserCredential } from 'firebase/auth';
import { all, call, put, takeLatest } from 'typed-redux-saga/macro';
import {
	AdditionalInformation,
	createUserDocumentAuth,
	createUserWithEmailAndPasswordAuth,
	getCurrentUser,
	signInWithEmailAndPasswordAuth,
	signInWithGooglePopup,
	signOutAuth,
} from '../../utils/firebase/firebase.utils';
import {
	signInFailure,
	signInSuccess,
	SignInWithEmailAndPassword,
	signOutFailure,
	signOutSuccess,
	signUpFailure,
	SignUpStart,
	SignUpSuccess,
	signUpSuccess,
} from './user.action';
import { USER_ACTION_TYPES } from './user.types';

export function* getSnapshotFromUserAuth(
	userAuth: User,
	additionalData?: AdditionalInformation
) {
	try {
		const userSnapshot = yield* call(
			createUserDocumentAuth,
			userAuth,
			additionalData
		);
		if (userSnapshot) {
			yield* put(
				signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
			);
		}

		return userSnapshot;
	} catch (error) {
		yield* put(signInFailure(error as Error));
	}
}

export function* signUp({
	payload: { email, password, displayName },
}: SignUpStart) {
	try {
		const userCredential = yield* call(
			createUserWithEmailAndPasswordAuth,
			email,
			password
		);
		if (userCredential) {
			const { user } = userCredential as UserCredential;
			yield* put(signUpSuccess(user, { displayName }));
		}
	} catch (error) {
		yield* put(signUpFailure(error as Error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield* call(signInWithGooglePopup);
		yield* call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield* put(signInFailure(error as Error));
	}
}

export function* signInWithEmail({
	payload: { email, password },
}: SignInWithEmailAndPassword) {
	try {
		const userCredential = yield* call(
			signInWithEmailAndPasswordAuth,
			email,
			password
		);

		if (userCredential) {
			const { user } = userCredential as UserCredential;
			yield* call(getSnapshotFromUserAuth, user);
		}
	} catch (error) {
		yield* put(signInFailure(error as Error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield* call(getCurrentUser);

		if (!userAuth) return;

		yield* call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield* put(signInFailure(error as Error));
	}
}

export function* signOut() {
	try {
		yield* call(signOutAuth);
		yield* put(signOutSuccess());
	} catch (error) {
		yield* put(signOutFailure(error as Error));
	}
}

export function* onSignUpStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signInAfterSignUp({
	payload: { user, additionalData },
}: SignUpSuccess) {
	yield* call(getSnapshotFromUserAuth, user, additionalData);
}

export function* onEmailSignInStart() {
	yield* takeLatest(
		USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_AND_PASSWORD,
		signInWithEmail
	);
}

export function* onGoogleSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
	yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
