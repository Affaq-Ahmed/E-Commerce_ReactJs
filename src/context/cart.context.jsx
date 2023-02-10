import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, cartItemToAdd) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const CartContext = createContext({
	isCartOpen: false,
	toggleCart: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(accumulatedQuantity, cartItem) =>
				accumulatedQuantity + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	const addItemToCart = (item) => {
		setCartItems(addCartItem(cartItems, item));
	};

	const toggleCart = () => {
		setCartOpen(!isCartOpen);
	};

	return (
		<CartContext.Provider
			value={{ isCartOpen, toggleCart, cartItems, addItemToCart, cartCount }}
		>
			{children}
		</CartContext.Provider>
	);
};
