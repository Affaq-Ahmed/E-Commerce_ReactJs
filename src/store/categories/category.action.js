import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { createAction } from '../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES } from './category.types';

export const fetchCategoriesStart = () =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
	createAction(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
		categoriesArray
	);

export const fetchCategoriesFailure = (errorMessage) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, errorMessage);

export const fetchCategoriesStartAsync = () => async (dispatch) => {
	dispatch(fetchCategoriesStart());
	try {
		const categoryArray = await getCategoriesAndDocuments();
		dispatch(fetchCategoriesSuccess(categoryArray));
	} catch (error) {
		dispatch(fetchCategoriesFailure(error.message));
	}
};
