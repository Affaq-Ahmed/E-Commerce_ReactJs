import './cart-item.styles.scss';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
	return (
		<div className='cart-item-container'>
			<img src={imageUrl} alt={`${name}`} />
			<div className='item-details'>
				<span className='name'>{name}</span>
				<span className='price'>
					{quantity} x Rs. {price}0
				</span>
			</div>
		</div>
	);
};

export default CartItem;
