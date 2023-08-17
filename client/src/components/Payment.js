import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, Elements, PaymentElement } from '@stripe/react-stripe-js';

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [donationAmount, setDonationAmount] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [thankYouMessage, setThankYouMessage] = useState('');

    const handleDonationSubmit = async (event) => {
        event.preventDefault();

        if (elements == null || !stripe) {
            return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            return;
        }

        const amountInCents = parseFloat(donationAmount) * 100;

        const { data: { client_secret } } = await axios.post('/payment', {
            amount: amountInCents
        });

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret: client_secret,
            confirmParams: {
                return_url: '/',
            },
            redirect: 'always'
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
            setSubmitted(true);
            setThankYouMessage(`Congratulations! You've helped a Pikachu find its way home! Thank you for your support!`);
            setDonationAmount('');
        }
    };

    return (
        <form
            onSubmit={handleDonationSubmit}
            className="flex flex-col items-center space-y-4 p-6 bg-gray-100 rounded-lg shadow-lg"
        >
            {submitted ? (
                <div className="text-center">
                    <p className="text-green-500">{thankYouMessage}</p>
                </div>
            ) : (
                <div className="w-full">
                    <label htmlFor="donationAmount" className="block text-sm font-medium text-gray-700">
                        Amount ($):
                    </label>
                    <input
                        type="number"
                        step="1.00"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        required
                        className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                    />

                    <PaymentElement className="mt-4" />

                    <div className="flex justify-center items-center h-full">
                        <button
                            type="submit"
                            disabled={!stripe || !elements}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Donate
                        </button>
                    </div>

                    {errorMessage && <div className="mt-2 text-red-500">{errorMessage}</div>}
                </div>
            )}
        </form>
    );
};

const stripePromise = loadStripe('pk_test_51NfzKjIhZBjNXEQUswJKnnMpxemtZUMguKheq6rBRKP9uZ7FdnpKb8eq2FZOBLYntYCA35U7uRdU14S1dQIu9gc200qXsfexxi');

const stripeOptions = {
    mode: 'payment',
    currency: 'usd',
    amount: 1099,
};

function Payment() {
    return (
        <Elements stripe={stripePromise} options={stripeOptions}>
            <PaymentForm />
        </Elements>
    )
};

export default Payment;
