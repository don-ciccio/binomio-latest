import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { formatCurrency } from "@/app/lib/utils/utilFuncs";
import { useCart } from "@/app/lib/hooks/useCart";
import { useAddressStore } from "@/app/lib/store";
import useSession from "@/app/lib/hooks/useSession";

export default function CheckoutForm(paymentIntent) {
    const shippingInfo = useAddressStore.getState().shippingInfo;
    const user = useSession();
    const [email, setEmail] = useState("");
    const { totalPrice } = useCart();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (!stripe) {
            return;
        }

        //Grab the client secret from url params
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage(
                        "Your payment was not successful, please try again."
                    );
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.log("not loaded");
            // Stripe.js has not yet loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/",
                receipt_email: email,
                shipping: {
                    address: {
                        line1: shippingInfo.address,
                        city: shippingInfo.city,
                        postal_code: shippingInfo.postalCode,
                    },
                    name: user.name,
                },
                payment_method_data: {
                    billing_details: {
                        name: user.name,
                    },
                },
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsLoading(false);
    };

    return (
        <>
            <form id='payment-form' onSubmit={handleSubmit} className='m-auto'>
                <div className='mb-6'>
                    <p className='text-[#718096] text-[15px] mb-2'>Email</p>

                    <input
                        className='block
            w-full
            rounded-3xl
            px-5
            py-6
          h-12'
                        id='email'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                    />
                </div>
                <PaymentElement id='payment-element' />
                <div className='mt-6'>
                    <button
                        className={`h-11 items-center justify-center flex w-full  bg-zinc-800 hover:bg-zinc-800/75 relative overflow-hidden text-center rounded-full px-5 py-4 cursor-pointer  text-zinc-200 hover:text-white`}
                        disabled={isLoading || !stripe || !elements}
                        id='submit'
                    >
                        <span id='button-text'>
                            {isLoading ? (
                                <div className='spinner' id='spinner'></div>
                            ) : (
                                `Paga ${formatCurrency(totalPrice)}`
                            )}
                        </span>
                    </button>
                </div>

                {/* Show any error or success messages */}
                {message && (
                    <div className='mt-3' id='payment-message'>
                        {message}
                    </div>
                )}
            </form>
        </>
    );
}
