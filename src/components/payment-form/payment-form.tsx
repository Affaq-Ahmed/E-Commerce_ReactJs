import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import React, { FormEvent } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button';

import './payment-form.styles.scss';

const ifValidCardElement = (
	card: StripeCardElement | null
): card is StripeCardElement => {
	return card !== null;
};

const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [isProcessing, setIsProcessing] = useState(false);

	const currentUser = useSelector(selectCurrentUser);
	const amount = useSelector(selectCartTotal);

	const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
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

		const clientSecret = response.clientSecret.client_secret;

		const cardDetails = elements.getElement(CardElement);

		if (!ifValidCardElement(cardDetails)) return;

		const paymentResult = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: cardDetails,
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
					buttonType={BUTTON_TYPE_CLASSES.primary}
				>
					Pay Now
				</Button>
			</form>
		</div>
	);
};

export default PaymentForm;
