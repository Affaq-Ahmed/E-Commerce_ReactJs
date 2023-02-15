import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.CHECK_USER_SESSION:
			return {
				...state,
				isLoading: true,
			};
		case USER_ACTION_TYPES.GOOGLE_SIGN_IN:
			return {
				...state,
				isLoading: true,
			};
		case USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_AND_PASSWORD:
			return {
				...state,
				isLoading: true,
			};
		case USER_ACTION_TYPES.SIGN_UP:
			return {
				...state,
				isLoading: true,
			};
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: payload,
				isLoading: false,
			};
		case USER_ACTION_TYPES.SIGN_IN_FAILURE:
			return {
				...state,
				error: payload,
				isLoading: false,
			};
		case USER_ACTION_TYPES.SIGN_OUT:
			return {
				...state,
				currentUser: null,
			};

		default:
			return state;
	}
};
