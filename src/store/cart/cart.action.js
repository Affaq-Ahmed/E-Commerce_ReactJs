import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

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

export const setIsCartOpen = (isCartOpen) => {
	return createAction(CART_ACTION_TYPES.TOGGLE_CART, isCartOpen);
};

export const addItemToCart = (cartItems, itemToAdd) => {
	const newCartItems = addCartItem(cartItems, itemToAdd);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const subtractItemFromCart = (cartItems, itemToRemove) => {
	const newCartItems = subtractCartItem(cartItems, itemToRemove);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
	const newCartItems = removeCartItem(cartItems, itemToRemove);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearCart = () =>
	createAction(CART_ACTION_TYPES.CLEAR_CART, {
		isCartOpen: false,
		cartItems: [],
	});

export const toggleCart = (isCartOpen) =>
	createAction(CART_ACTION_TYPES.TOGGLE_CART, isCartOpen);
