import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button from '../button/button';
import CartItem from '../cart-item/cart-item';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{/* <span className='empty-message'>Your cart is empty</span> */}
				{cartItems.map((item) => {
					return <CartItem key={item.id} item={item} />;
				})}
			</div>
			<Button buttonType='primary'>GO TO CHECKOUT</Button>
		</div>
	);
};

export default CartDropdown;
