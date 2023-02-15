import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button';
import './product-card.styles.scss';

const ProductCard = ({ product }) => {
	const cartItems = useSelector(selectCartItems);
	const { name, price, imageUrl } = product;

	const dispatch = useDispatch();

	const addToCart = () => dispatch(addItemToCart(cartItems,product));

	return (
		<div className='product-card-container'>
			<img src={imageUrl} alt={name} />
			<div className='footer'>
				<span className='name'>{name}</span>
				<span className='price'>${price}</span>
			</div>
			<Button buttonType='inverted' onClick={addToCart}>
				Add to Card
			</Button>
		</div>
	);
};

export default ProductCard;
