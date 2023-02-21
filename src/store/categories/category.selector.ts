import { createSelector } from 'reselect';
import { RootState } from '../store';

import { CategoriesState } from './category.reducer';
import { CategoryMap } from './category.types';

const selectCategoryReducer = (state: RootState): CategoriesState =>
	state.categories;

export const selectCategories = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => categoriesSlice.categories
);

export const selectIsCategoriesLoading = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => categoriesSlice.isLoading
);

export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories): CategoryMap => {
		return categories.reduce((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {} as CategoryMap);
	}
);
