import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview';
import { selectCategoriesMap } from '../../store/categories/category.selector';

const CategoriesPreview = () => {
	const categories = useSelector(selectCategoriesMap);

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
