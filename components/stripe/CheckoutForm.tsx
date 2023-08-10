"use client";
import { FormEvent, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import classNames from "classnames";
import { StripeError } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

function CheckoutForm({ clientSecret = "" }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<String | null | undefined>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/Salon/Servicios/pagos/confirmado`,
      },
    });

    if (result.error) {
      setMessage(result.error.message);
      return console.log(result.error.message);
    }
    setIsProcessing(false);
  };

  async function cancelStripeCharge() {
    const paymentIntent = await stripe?.retrievePaymentIntent(clientSecret);
    const paymentIntentId = paymentIntent?.paymentIntent?.id;
    console.log(paymentIntentId);
    const graphqlQuery = `
    mutation {
      cancelStripeCharge(
        paymentIntentId: "${paymentIntentId}"
      )
    }
      `;

    fetch(process.env.BRETA_API!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: graphqlQuery }),
    }).then(async (r) => {
      const res = await r.json();
      console.log(res);
      router.push(`${window.location.origin}/Salon/Servicios`);
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={classNames("w-3/4 max-w-lg h-auto", "flex flex-col", "")}
      >
        <PaymentElement />
        <button
          disabled={isProcessing}
          className={classNames(
            "outline outline-1",
            "mt-6",
            "w-full max-w-[320px]",
            "rounded",
            "place-self-center"
          )}
        >
          <span>{isProcessing ? "Processing ..." : "Pay now"}</span>
        </button>
        {message && <div>{message}</div>}
      </form>
      <button
        onClick={cancelStripeCharge}
        className={classNames(
          "w-3/4 max-w-[320px]",
          "mt-4",
          "outline outline-1",
          "rounded",
          "bg-red-200 hover:bg-red-400 hover:res focus:ring focus:ring-red-300",
          "transition-all duration-300"
        )}
      >
        <span>Cancel</span>
      </button>
    </>
  );
}

export default CheckoutForm;
