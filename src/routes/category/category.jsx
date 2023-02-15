import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card';
import Spinner from '../../components/spinner/spinner';
import {
	selectCategoriesMap,
	selectIsCategoriesLoading,
} from '../../store/categories/category.selector';

import './category.styles.scss';

const Category = () => {
	const { category } = useParams();
	const categories = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectIsCategoriesLoading);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(categories[category]);
	}, [category, categories]);

	return (
		<>
			<h2 className='category-title'>{category.toUpperCase()}</h2>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='category-container'>
					{products &&
						products.map((product) => {
							return <ProductCard key={product.id} product={product} />;
						})}
				</div>
			)}
		</>
	);
};

export default Category;
