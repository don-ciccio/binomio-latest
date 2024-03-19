import CheckoutForm from "@/app/components/main/CheckoutForm";
import { useCart } from "@/app/lib/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const [clientSecret, setClientSecret] = React.useState("");
    const [paymentIntent, setPaymentIntent] = React.useState("");
    const { totalPrice } = useCart();

    React.useEffect(() => {
        // Create PaymentIntent as soon as the page loads using our local API
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stripe_intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: totalPrice * 100,
                payment_intent_id: "",
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.client_secret), setPaymentIntent(data.id);
            });
    }, []);

    const appearance = {
        theme: "flat",

        variables: {
            fontLineHeight: "1.25rem",
            colorBackground: "#fff",
            colorText: "#30313d",
            colorDanger: "#df1b41",
            fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
            spacingUnit: "2px",
            borderRadius: "2rem",

            // See all possible variables below
        },
        labels: "floating",
        rules: {
            ".Input": {
                paddingLeft: "1.25rem",
                paddingRight: "1.25rem",
            },

            ".Tab": {
                paddingLeft: "1.25rem",
                paddingRight: "1.25rem",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #E0E6EB",
                boxShadow:
                    "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)",
            },

            ".Block": {
                paddingLeft: "1.25rem",
                paddingRight: "1.25rem",
                borderRadius: "0.5rem",
            },
            ".Tab:hover": {
                color: "var(--colorText)",
            },

            ".Tab--selected": {
                borderColor: "#E0E6EB",
                boxShadow:
                    "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px rgba(39, 39, 42, 1)",
                backgroundColor: " rgba(39, 39, 42, 1)",
            },
            ".Tab--selected:focus": {
                boxShadow:
                    "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px rgba(39, 39, 42, 1)",
            },
        },
    };
    const options = {
        clientSecret,
        appearance,
        fonts: [
            {
                family: "Bricolage Grotesque",
                src: "url(https://fonts.gstatic.com/s/bricolagegrotesque/v2/3y9K6as8bTXq_nANBjzKo3IeZx8z6up5BeSl9D4dj_x9PpZBMlGIInHWVyNJ.woff2) format('woff2')",
                style: "normal",
                weight: "400",
            },
        ],
    };

    return (
        <div className='pb-[35px]  lg:pb-0'>
            {clientSecret && (
                <Elements options={options} stripe={stripe}>
                    <CheckoutForm paymentIntent={paymentIntent} />
                </Elements>
            )}
        </div>
    );
};

export default Payment;
