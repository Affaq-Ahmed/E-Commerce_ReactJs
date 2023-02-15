import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../../components/categories-preview/categories-preview';
import { fetchCategoriesStart } from '../../store/categories/category.action';
import Category from '../category/category';

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategoriesStart());
	}, [dispatch]);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
};

export default Shop;
