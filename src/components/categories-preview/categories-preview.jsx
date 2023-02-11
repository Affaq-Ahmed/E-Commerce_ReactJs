import { useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview';
import { CategoriesContext } from '../../context/categories.context';

const CategoriesPreview = () => {
	const { categories } = useContext(CategoriesContext);
	return (
		<>
			{Object.keys(categories).map((title) => {
				const products = categories[title];
				return (
					<CategoryPreview key={title} title={title} products={products} />
				);
			})}
		</>
	);
};

export default CategoriesPreview;
