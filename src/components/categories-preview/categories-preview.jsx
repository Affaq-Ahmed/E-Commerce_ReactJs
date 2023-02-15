import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview';
import {
	selectCategoriesMap,
	selectIsCategoriesLoading,
} from '../../store/categories/category.selector';
import Spinner from '../spinner/spinner';

const CategoriesPreview = () => {
	const categories = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectIsCategoriesLoading);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				Object.keys(categories).map((title) => {
					const products = categories[title];
					return (
						<CategoryPreview key={title} title={title} products={products} />
					);
				})
			)}
		</>
	);
};

export default CategoriesPreview;
