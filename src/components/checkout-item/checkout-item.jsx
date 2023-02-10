import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
	const { name, imageUrl, price, quantity } = item;
	const { removeItemFromCart, addItemToCart, subtractItemFromCart } =
		useContext(CartContext);

	const removeItemHandler = () => {
		removeItemFromCart(item);
	};

	const addItemHandler = () => {
		addItemToCart(item);
	};

	const subtractItemHandler = () => {
		subtractItemFromCart(item);
	};

	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img src={imageUrl} alt={`${name}`} />
			</div>
			<span className='name'>{name}</span>
			<span className='quantity'>
				<div className='arrow' onClick={subtractItemHandler}>
					&#10094;
				</div>
				<span className='value'>{quantity}</span>
				<div className='arrow' onClick={addItemHandler}>
					&#10095;
				</div>
			</span>
			<span className='price'>{price}0</span>
			<div className='remove-button' onClick={removeItemHandler}>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
