import { useDispatch, useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/checkout-item';
import PaymentForm from '../../components/payment-form/payment-form';
import { clearCart } from '../../store/cart/cart.action';
import {
	selectCartItems,
	selectCartTotal,
} from '../../store/cart/cart.selector';
import './checkout.styles.scss';

const Checkout = () => {
	const dispatch = useDispatch();

	const cartItems = useSelector(selectCartItems);
	const total = useSelector(selectCartTotal);
	const clearCartHandler = () => dispatch(clearCart());

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
					<span>Price ($)</span>
				</div>
				<div className='header-block'>
					<span>Remove</span>
				</div>
			</div>
			{cartItems.map((item) => {
				return <CheckoutItem key={item.id} item={item} />;
			})}
			<span className='total'>{`Total: $${total}`}</span>
			<span className='clear-cart' onClick={clearCartHandler}>
				Clear Cart
			</span>

			<PaymentForm />
		</div>
	);
};

export default Checkout;
