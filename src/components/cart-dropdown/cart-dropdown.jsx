import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleCart } from '../../store/cart/cart.action';
import {
	selectCartItems,
	selectIsCartOpen,
} from '../../store/cart/cart.selector';

import Button from '../button/button';
import CartItem from '../cart-item/cart-item';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cartItems = useSelector(selectCartItems);
	const isCartOpen = useSelector(selectIsCartOpen);

	const toggleCartHandler = () => dispatch(toggleCart(!isCartOpen));

	const gotoCheckoutHandler = () => {
		toggleCartHandler();
		navigate('/checkout');
	};

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.length === 0 && (
					<span className='empty-message'>Your cart is empty</span>
				)}
				{cartItems.map((item) => {
					return <CartItem key={item.id} item={item} />;
				})}
			</div>
			<Button buttonType='primary' onClick={gotoCheckoutHandler}>
				GO TO CHECKOUT
			</Button>
		</div>
	);
};

export default CartDropdown;
