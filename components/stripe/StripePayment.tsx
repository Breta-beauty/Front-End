import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

function StripePayment() {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  const amount = 200;
  const currency = "mxn";
  const paymentMethodTypes = ["card"];
  const stripeCustomerId = "cus_OJNfXUILiOVJPI";
  const URL = process.env.BRETA_API || null;

  useEffect(() => {
    const graphqlQuery = `
      {
        stripePublishableKey
      }
      `;

    fetch(URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: graphqlQuery }),
    }).then(async (r) => {
      const res = await r.json();
      const data = res.data;
      if (!data) return;

      setStripePromise(loadStripe(data.stripePublishableKey));
    });
  }, []);

  useEffect(() => {
    const graphqlQuery = `
    mutation{
        clientSecret(
          stripe_customer_id: "${stripeCustomerId}"
          stripeChargeInput: {
          paymentMethodTypes: "${paymentMethodTypes}"
          amount: ${amount}
          currency: "${currency}"
        }
        )
      }
      `;

    fetch(URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: graphqlQuery }),
    }).then(async (r) => {
      const res = await r.json();
      const data = res.data;
      console.log({ clientSecret: data.clientSecret });

      setClientSecret(data.clientSecret);
    });
  }, []);

  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            appearance: { theme: "stripe" },
            clientSecret,
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default StripePayment;
