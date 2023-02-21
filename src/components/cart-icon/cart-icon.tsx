import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCartItemsCount,
	selectIsCartOpen,
} from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import React from 'react';

const CartIcon = () => {
	const dispatch = useDispatch();

	const cartCount = useSelector(selectCartItemsCount);
	const isCartOpen = useSelector(selectIsCartOpen);
	const toggleCartHandler = () => {
		return dispatch(setIsCartOpen(!isCartOpen));
	};

	return (
		<div className='cart-icon-container' onClick={toggleCartHandler}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{cartCount}</span>
		</div>
	);
};

export default CartIcon;
