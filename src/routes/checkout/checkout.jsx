import { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item';
import { CartContext } from '../../context/cart.context';
import './checkout.styles.scss';

const Checkout = () => {
	const { cartItems, clearCart, total } = useContext(CartContext);

	return (
		<div className='checkout-container'>
			<div className='checkout-header'>
				<div className='header-block'>
					<span>Product</span>
				</div>
				<div className='header-block'>
					<span>Description</span>
				</div>
				<div className='header-block'>
					<span>Quantity</span>
				</div>
				<div className='header-block'>
					<span>Price(PKR)</span>
				</div>
				<div className='header-block'>
					<span>Remove</span>
				</div>
			</div>
			{cartItems.map((item) => {
				return <CheckoutItem key={item.id} item={item} />;
			})}
			<span className='total'>Total: {total}0</span>
			<span className='clear-cart' onClick={clearCart}>
				Clear Cart
			</span>
		</div>
	);
};

export default Checkout;
