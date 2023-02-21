import { UserData } from '../../utils/firebase/firebase.utils';
import { AnyAction } from 'redux';
import {
	signInFailure,
	signInSuccess,
	signOutFailure,
	signOutSuccess,
	signUpFailure,
} from './user.action';

export type UserState = {
	readonly currentUser: UserData | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (
	state = INITIAL_STATE,
	action: AnyAction
): UserState => {
	if (signInSuccess.match(action)) {
		return {
			...state,
			currentUser: action.payload || null,
			isLoading: false,
		};
	}
	if (signOutSuccess.match(action)) {
		return {
			...state,
			currentUser: null,
			isLoading: false,
		};
	}
	if (
		signInFailure.match(action) ||
		signUpFailure.match(action) ||
		signOutFailure.match(action)
	) {
		return {
			...state,
			error: action.payload || null,
			isLoading: false,
		};
	}

	return state;
};
// switch (type) {
// 	case USER_ACTION_TYPES.CHECK_USER_SESSION:
// 	case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
// 	case USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_AND_PASSWORD:
// 	case USER_ACTION_TYPES.SIGN_UP_START:
// 		return {
// 			...state,
// 			isLoading: true,
// 		};
// 	case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
// 		return {
// 			...state,
// 			currentUser: payload,
// 			isLoading: false,
// 		};
// 	case USER_ACTION_TYPES.SIGN_OUT_START:
// 		return {
// 			...state,
// 			isLoading: true,
// 		};
// 	case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
// 		return {
// 			...state,
// 			currentUser: null,
// 			isLoading: false,
// 		};
// 	case USER_ACTION_TYPES.SIGN_UP_FAILURE:
// 	case USER_ACTION_TYPES.SIGN_IN_FAILURE:
// 	case USER_ACTION_TYPES.SIGN_OUT_FAILURE:
// 		return {
// 			...state,
// 			error: payload,
// 			isLoading: false,
// 		};

// 	default:
// 		return state;
// }
