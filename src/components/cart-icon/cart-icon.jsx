import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CartIcon = ({ itemCount }) => {
	const { toggleCart } = useContext(CartContext);

	return (
		<div className='cart-icon-container' onClick={toggleCart}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>100</span>
		</div>
	);
};

export default CartIcon;
