import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

function StripeComponent() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const URL = process.env.BRETA_API || null;

  useEffect(() => {
    const graphqlQuery = `
    {
      stripePublishableKey
    }
    `;

    fetch(process.env.BRETA_API!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: graphqlQuery }),
    }).then(async (r) => {
      const { stripePublishableKey } = await r.json();

      // setStripePromise(loadStripe(stripePublishableKey || null));
    });
  }, []);

  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  );
}

export default StripeComponent;
