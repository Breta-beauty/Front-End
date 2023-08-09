import { FormEvent, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import classNames from "classnames";
import { StripeError } from "@stripe/stripe-js";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

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

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={classNames("w-3/4 max-w-lg h-auto", "flex flex-col", "")}
      >
        <PaymentElement />
        <button
          disabled={isProcessing}
          className={classNames("outline outline-1", "mt-6", "rounded")}
        >
          <span>{isProcessing ? "Processing ..." : "Pay now"}</span>
        </button>
        {message && <div>{message}</div>}
      </form>
    </>
  );
}

export default CheckoutForm;
