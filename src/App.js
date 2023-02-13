import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Authentication from './routes/authentication/authentication';
import Checkout from './routes/checkout/checkout';

import Home from './routes/home/home';
import Navigation from './routes/navigation/navigation';
import Shop from './routes/shop/shop';
import {
	createUserDocumentAuth,
	onAuthStateChangedListener,
} from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		function chuss() {
			const unsubscribe = onAuthStateChangedListener((user) => {
				if (user) {
					createUserDocumentAuth(user);
				}
				dispatch(setCurrentUser(user));
			});

			return unsubscribe;
		}
		chuss();
	}, [dispatch]);

	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='shop/*' element={<Shop />} />
				<Route path='auth' element={<Authentication />} />
				<Route path='checkout' element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;
