import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../../components/categories-preview/categories-preview';
import { setCategories } from '../../store/categories/category.reducer';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import Category from '../category/category';

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const getCategories = async () => {
			const categoriesArray = await getCategoriesAndDocuments();

			dispatch(setCategories(categoriesArray));
		};
		getCategories();
	}, [dispatch]);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
};

export default Shop;
