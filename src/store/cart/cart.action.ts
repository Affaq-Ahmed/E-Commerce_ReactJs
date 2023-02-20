import {
	createAction,
	withMatcher,
	Action,
	ActionWithPayload,
} from '../../utils/reducer/reducer.utils';
import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

const addCartItem = (
	cartItems: CartItem[],
	cartItemToAdd: CategoryItem
): CartItem[] => {
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

const subtractCartItem = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
): CartItem[] => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	if (existingCartItem && existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}

	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const removeCartItem = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
): CartItem[] => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export type SetIsCartOpen = ActionWithPayload<
	typeof CART_ACTION_TYPES.TOGGLE_CART,
	boolean
>;

export type SetCartItems = ActionWithPayload<
	typeof CART_ACTION_TYPES.SET_CART_ITEMS,
	CartItem[]
>;

export const setIsCartOpen = withMatcher(
	(isCartOpen: boolean): SetIsCartOpen => {
		return createAction(CART_ACTION_TYPES.TOGGLE_CART, isCartOpen);
	}
);

export const setCartItems = withMatcher(
	(cartItems: CartItem[]): SetCartItems => {
		return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
	}
);

export const addItemToCart = (
	cartItems: CartItem[],
	itemToAdd: CategoryItem
) => {
	const newCartItems = addCartItem(cartItems, itemToAdd);
	return setCartItems(newCartItems);
};

export const subtractItemFromCart = (
	cartItems: CartItem[],
	itemToRemove: CartItem
) => {
	const newCartItems = subtractCartItem(cartItems, itemToRemove);
	return setCartItems(newCartItems);
};

export const removeItemFromCart = (
	cartItems: CartItem[],
	itemToRemove: CartItem
) => {
	const newCartItems = removeCartItem(cartItems, itemToRemove);
	return setCartItems(newCartItems);
};

export const clearCart = withMatcher(() => {
	const newCartItems: CartItem[] = [];
	return setCartItems(newCartItems);
});

export const toggleCart = withMatcher((isCartOpen: boolean): SetIsCartOpen => {
	return createAction(CART_ACTION_TYPES.TOGGLE_CART, isCartOpen);
});
