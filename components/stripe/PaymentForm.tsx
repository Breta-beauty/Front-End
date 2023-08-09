import { CardElement, PaymentElement } from "@stripe/react-stripe-js";
import usePaymentFormLogic from "./CheckoutForm";
import classNames from "classnames";
import CheckoutForm from "./CheckoutForm";

function PaymentForm() {
  // const { handleSubmit } = CheckoutForm();
  return (
    <div
      className={classNames(
        "flex justify-center items-center",
        "h-[88svh] min-h-[160px] max-h-[460px]"
      )}
    >
      <form
        // onSubmit={handleSubmit}
        className={classNames("w-3/4 max-w-lg h-auto", "flex flex-col")}
      >
        <PaymentElement />
        <button
          className={classNames(
            "mt-4 w-3/4",
            "outline outline-1 outline-gray-500 font-light",
            "rounded",
            "self-center",
            "hover:outline-2"
          )}
        >
          Pay
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
