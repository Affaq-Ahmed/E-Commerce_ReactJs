import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

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

export const CART_ACTION_TYPES = {
	TOGGLE_CART: 'TOGGLE_CART',
	SET_CART_ITEMS: 'SET_CART_ITEMS',
	CLEAR_CART: 'CLEAR_CART',
};

const cartReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case CART_ACTION_TYPES.TOGGLE_CART:
			return {
				...state,
				isCartOpen: payload,
			};
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPES.CLEAR_CART:
			return {
				...state,
				...payload,
			};
		default:
			throw new Error(`Unhandled action type: ${type} in cartReducer.`);
	}
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	total: 0,
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
	const { isCartOpen, cartItems, cartCount, total } = state;

	const setCartOpen = (isCartOpen) => {
		dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART, isCartOpen));
	};

	const clearCartItems = () => {
		dispatch(
			createAction(CART_ACTION_TYPES.CLEAR_CART, {
				cartItems: [],
				cartCount: 0,
				total: 0,
			})
		);
	};

	const updateCartItemsReducer = (cartItems) => {
		const newCartCount = cartItems.reduce(
			(accumulatedQuantity, cartItem) =>
				accumulatedQuantity + cartItem.quantity,
			0
		);

		const newTotal = cartItems.reduce(
			(accumulatedQuantity, cartItem) =>
				accumulatedQuantity + cartItem.quantity * cartItem.price,
			0
		);

		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
				cartItems,
				cartCount: newCartCount,
				total: newTotal,
			})
		);
	};

	const addItemToCart = (itemToAdd) => {
		const newCartItems = addCartItem(cartItems, itemToAdd);
		updateCartItemsReducer(newCartItems);
	};

	const subtractItemFromCart = (itemToRemove) => {
		const newCartItems = subtractCartItem(cartItems, itemToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const removeItemFromCart = (itemToRemove) => {
		const newCartItems = removeCartItem(cartItems, itemToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const clearCart = () => {
		clearCartItems([]);
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
