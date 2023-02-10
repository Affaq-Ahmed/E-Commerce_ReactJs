import { createContext, useState } from 'react';

export const CartContext = createContext({
	isCartOpen: false,
	toggleCart: () => {},
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setCartOpen] = useState(false);

	const toggleCart = () => {
		setCartOpen(!isCartOpen);
	};

	return (
		<CartContext.Provider value={{ isCartOpen, toggleCart }}>
			{children}
		</CartContext.Provider>
	);
};
