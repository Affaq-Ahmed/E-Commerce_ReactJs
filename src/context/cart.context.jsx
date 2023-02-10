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

const subtractCartItem = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}

	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const removeCartItem = (cartItems, cartItemToRemove) => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export const CartContext = createContext({
	isCartOpen: false,
	toggleCart: () => {},
	cartItems: [],
	addItemToCart: () => {},
	subtractItemFromCart: () => {},
	removeItemFromCart: () => {},
	clearCart: () => {},
	cartCount: 0,
	total: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(accumulatedQuantity, cartItem) =>
				accumulatedQuantity + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newTotal = cartItems.reduce(
			(accumulatedQuantity, cartItem) =>
				accumulatedQuantity + cartItem.quantity * cartItem.price,
			0
		);
		setTotal(newTotal);
	}, [cartItems]);

	const addItemToCart = (itemToAdd) => {
		setCartItems(addCartItem(cartItems, itemToAdd));
	};

	const subtractItemFromCart = (itemToRemove) => {
		setCartItems(subtractCartItem(cartItems, itemToRemove));
	};

	const removeItemFromCart = (itemToRemove) => {
		setCartItems(removeCartItem(cartItems, itemToRemove));
	};

	const clearCart = () => {
		setCartItems([]);
	};

	const toggleCart = () => {
		setCartOpen(!isCartOpen);
	};

	return (
		<CartContext.Provider
			value={{
				isCartOpen,
				toggleCart,
				cartItems,
				addItemToCart,
				subtractItemFromCart,
				removeItemFromCart,
				clearCart,
				cartCount,
				total,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
