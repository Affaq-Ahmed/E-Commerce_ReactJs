import { createContext, useEffect, useState } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const CategoriesContext = createContext({
	categories: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categories, setCategories] = useState({});
	const value = { categories };

	useEffect(() => {
		const getCategories = async () => {
			const categories = await getCategoriesAndDocuments();
			setCategories(categories);
		};
		getCategories();
	}, []);

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
