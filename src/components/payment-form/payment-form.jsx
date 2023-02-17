import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import Button from '../button/button';

import './payment-form.styles.scss';

const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [isProcessing, setIsProcessing] = useState(false);

	const currentUser = useSelector(selectCurrentUser);
	const amount = useSelector(selectCartTotal);

	const paymentHandler = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) return;

		setIsProcessing(true);

		const response = await fetch('/.netlify/functions/create-payment-intent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				amount: amount * 100,
			}),
		}).then((res) => res.json());

		console.log({ response });
		const clientSecret = response.clientSecret.client_secret;

		const paymentResult = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest',
				},
			},
		});

		setIsProcessing(false);

		if (paymentResult.error) {
			console.log(paymentResult.error.message);
			alert(paymentResult.error.message);
		} else {
			console.log('Payment Successful');
			alert('Payment Successful');
		}
	};

	return (
		<div className='payment-form'>
			<form onSubmit={paymentHandler} className='form-container'>
				<h2>Credit Card Payment:</h2>
				<CardElement />
				<Button
					isLoading={isProcessing}
					type='submit'
					buttonType='inverted'
				>
					Pay Now
				</Button>
			</form>
		</div>
	);
};

export default PaymentForm;
