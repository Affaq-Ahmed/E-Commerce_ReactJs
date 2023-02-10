import { useContext, useState } from 'react';
import ProductCard from '../../components/product-card/product-card';
import { ProductContext } from '../../context/product.context';

import './shop.styles.scss';

const Shop = () => {
	const { products } = useContext(ProductContext);
	return (
		<div className='shop-container'>
			{products.map((product) => {
				return <ProductCard product={product} key={product.id} />;
			})}
		</div>
	);
};

export default Shop;
