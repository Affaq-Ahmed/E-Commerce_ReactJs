import { CartState } from './cart.types';
import { createSelector } from 'reselect';

const selectCartReducer = (state): CartState => state.cart;

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
	(cartItems) =>
		cartItems.reduce(
			(accumulatedQuantity, cartItem) =>
				accumulatedQuantity + cartItem.quantity,
			0
		)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce(
		(accumulatedQuantity, cartItem) =>
			accumulatedQuantity + cartItem.quantity * cartItem.price,
		0
	)
);
