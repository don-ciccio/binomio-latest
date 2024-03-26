import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { formatCurrency } from "@/app/lib/utils/utilFuncs";
import { useCart } from "@/app/lib/hooks/useCart";
import { useAddressStore, useCartStore } from "@/app/lib/store";
import useSession from "@/app/lib/hooks/useSession";
import api from "@/app/lib/utils/axiosInterceptor";

export default function CheckoutForm(paymentIntent) {
    const shippingInfo = useAddressStore.getState().shippingInfo;
    const { clearCart } = useCartStore();

    const user = useSession();
    const [email, setEmail] = useState("");
    const { totalPrice, cartData } = useCart();

    const [success, setSuccess] = useState(false);
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

        stripe
            .confirmPayment({
                elements,
                redirect: "if_required",
                confirmParams: {
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
            })
            .then((result) => {
                if (!result.error) {
                    setSuccess(true);

                    try {
                        let res;

                        const data = {
                            orderItems: cartData,
                            shippingInfo,
                            totalPrice,
                            isPaid: true,
                            user: user._id,
                        };
                        const config = {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        };

                        res = api.post("/api/order/new", data, config);

                        if (res.error) {
                            console.log(res.error.errMessage);
                        }
                    } catch (error) {
                        console.log(error);
                    }

                    clearCart();
                } else if (
                    (result.error && result.error.type === "card_error") ||
                    (result.error && result.error.type === "validation_error")
                ) {
                    setMessage(result.error.message);
                } else {
                    setMessage("An unexpected error occured.");
                }
            });

        setIsLoading(false);
    };

    return (
        <>
            {!success && (
                <form
                    id='payment-form'
                    onSubmit={handleSubmit}
                    className='m-auto max-w-xl lg:pb-[35px]'
                >
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
            )}
            {success && <span>Pagamento completato</span>}
        </>
    );
}
