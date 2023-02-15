import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
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
	signOutFailure,
	signOutSuccess,
	signUpFailure,
	signUpSuccess,
} from './user.action';
import { USER_ACTION_TYPES } from './user.types';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userSnapshot = yield call(
			createUserDocumentAuth,
			userAuth,
			additionalData
		);
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));

		return userSnapshot;
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signUp({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield call(
			createUserWithEmailAndPasswordAuth,
			email,
			password
		);
		yield put(signUpSuccess(user, { displayName }));
	} catch (error) {
		yield put(signUpFailure(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield call(
			signInWithEmailAndPasswordAuth,
			email,
			password
		);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);

		if (!userAuth) return;

		yield call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signOut() {
	try {
		yield call(signOutAuth);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailure(error));
	}
}

export function* onSignUpStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
	yield call(getSnapshotFromUserAuth, user, additionalData);
}

export function* onEmailSignInStart() {
	yield takeLatest(
		USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_AND_PASSWORD,
		signInWithEmail
	);
}

export function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN, signInWithGoogle);
}

export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
