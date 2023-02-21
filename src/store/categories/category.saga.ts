import { all, call, put, takeLatest } from 'typed-redux-saga/macro';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import {
	fetchCategoriesFailure,
	fetchCategoriesSuccess,
} from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
	try {
		const categoryArray = yield* call(getCategoriesAndDocuments);
		yield* put(fetchCategoriesSuccess(categoryArray));
	} catch (error) {
		yield* put(fetchCategoriesFailure(error as Error));
	}
}

export function* onFetchCategoriesStart() {
	yield* takeLatest(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
		fetchCategoriesAsync
	);
}

export function* categoriesSaga() {
	yield* all([call(onFetchCategoriesStart)]);
}
