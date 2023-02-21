import React from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown';
import CartIcon from '../../components/cart-icon/cart-icon';

import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';
import { selectCurrentUser } from '../../store/user/user.selector';
import './navigation.styles.scss';

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);

	const dispatch = useDispatch();

	const signOutAuth = () => {
		dispatch(signOutStart());
	};

	return (
		<Fragment>
			<div className='navigation'>
				<Link className='logo-container' to='/'>
					<Logo className='logo' />
				</Link>
				<div className='nav-links-container'>
					<Link className='nav-link' to='/shop'>
						SHOP
					</Link>
					<Link className='nav-link' to='/shop'>
						CONTACT
					</Link>
					{currentUser ? (
						<span className='nav-link' onClick={signOutAuth}>
							{' '}
							SIGN OUT{' '}
						</span>
					) : (
						<Link className='nav-link' to='/auth'>
							SIGN IN
						</Link>
					)}
					<CartIcon />
				</div>
				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
