import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
	createUserDocumentAuth,
	getCurrentUser,
	signInWithEmailAndPasswordAuth,
	signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';
import { signInFailure, signInSuccess } from './user.action';
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
	} catch (error) {}
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

export function* userSaga() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
	]);
}
