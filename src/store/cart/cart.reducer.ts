import { AnyAction } from 'redux';
import { setCartItems, setIsCartOpen } from './cart.action';
import { CartItem } from './cart.types';

export type CartState = {
	isCartOpen: boolean;
	cartItems: CartItem[];
};

const INITIAL_STATE: CartState = {
	isCartOpen: false,
	cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action: AnyAction) => {
	if (setIsCartOpen.match(action)) {
		return {
			...state,
			isCartOpen: action.payload,
		};
	}
	if (setCartItems.match(action)) {
		return {
			...state,
			cartItems: action.payload,
		};
	}
	return state;
};
// switch (type) {
// 	case CART_ACTION_TYPES.TOGGLE_CART:
// 		return {
// 			...state,
// 			isCartOpen: payload,
// 		};
// 	case CART_ACTION_TYPES.SET_CART_ITEMS:
// 		return {
// 			...state,
// 			cartItems: payload,
// 		};
// 	case CART_ACTION_TYPES.CLEAR_CART:
// 		return {
// 			...state,
// 			...payload,
// 		};
// 	default:
// 		return state;
// }
