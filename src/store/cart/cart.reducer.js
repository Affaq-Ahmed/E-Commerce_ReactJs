import { createSlice } from '@reduxjs/toolkit';

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

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState: INITIAL_STATE,
	reducers: {
		toggleCart: (state, action) => {
			state.isCartOpen = !state.isCartOpen;
		},
		addItemToCart: (state, action) => {
			state.cartItems = addCartItem(state.cartItems, action.payload);
		},
		subtractItemFromCart: (state, action) => {
			state.cartItems = subtractCartItem(state.cartItems, action.payload);
		},
		removeItemFromCart: (state, action) => {
			state.cartItems = removeCartItem(state.cartItems, action.payload);
		},
		clearCart: (state) => {
			state.isCartOpen = false;
			state.cartItems = [];
		},
	},
});

export const {
	toggleCart,
	addItemToCart,
	subtractItemFromCart,
	removeItemFromCart,
	clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
