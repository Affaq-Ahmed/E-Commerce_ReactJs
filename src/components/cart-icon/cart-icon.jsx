import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemsCount } from '../../store/cart/cart.selector';
import { toggleCart } from '../../store/cart/cart.reducer';

const CartIcon = ({ itemCount }) => {
	const dispatch = useDispatch();

	const cartCount = useSelector(selectCartItemsCount);
	const toggleCartHandler = () => dispatch(toggleCart());

	return (
		<div className='cart-icon-container' onClick={toggleCartHandler}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{cartCount}</span>
		</div>
	);
};

export default CartIcon;
