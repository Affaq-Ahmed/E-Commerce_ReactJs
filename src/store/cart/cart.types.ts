import { CategoryItem } from '../categories/category.types';

export enum CART_ACTION_TYPES {
	TOGGLE_CART = 'cart/TOGGLE_CART',
	SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
	CLEAR_CART = 'cart/CLEAR_CART',
	SET_CART_COUNT = 'cart/SET_CART_COUNT',
	SET_CART_TOTAL = 'cart/SET_CART_TOTAL',
}

export type CartItem = CategoryItem & {
	quantity: number;
};

export type Cart = {
	isCartOpen: boolean;
	cartItems: CartItem[];
};

export type CartState = {
	isCartOpen: boolean;
	cartItems: CartItem[];
	cartCount: number;
	cartTotal: number;
};
