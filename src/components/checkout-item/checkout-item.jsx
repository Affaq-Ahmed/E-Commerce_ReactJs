import { useDispatch } from 'react-redux';

import {
	addItemToCart,
	removeItemFromCart,
	subtractItemFromCart,
} from '../../store/cart/cart.reducer';

import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
	const { name, imageUrl, price, quantity } = item;

	const dispatch = useDispatch();

	const removeItemHandler = () => dispatch(removeItemFromCart(item));
	const addItemHandler = () => dispatch(addItemToCart(item));
	const subtractItemHandler = () => dispatch(subtractItemFromCart(item));

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
			<span className='price'>{price}</span>
			<div className='remove-button' onClick={removeItemHandler}>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
