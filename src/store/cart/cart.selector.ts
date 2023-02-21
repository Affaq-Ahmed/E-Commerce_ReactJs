import { CartState } from './cart.reducer';
import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectIsCartOpen = createSelector(
	[selectCartReducer],
	(cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
	[selectCartReducer],
	(cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	(cartItems): number =>
		cartItems.reduce(
			(accumulatedQuantity, cartItem) =>
				accumulatedQuantity + cartItem.quantity,
			0
		)
);

export const selectCartTotal = createSelector(
	[selectCartItems],
	(cartItems): number =>
		cartItems.reduce(
			(accumulatedQuantity, cartItem) =>
				accumulatedQuantity + cartItem.quantity * cartItem.price,
			0
		)
);
