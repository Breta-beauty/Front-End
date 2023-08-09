"use client";
import HeaderComponent from "@/components/header/HeaderComponent";
import StripePayment from "@/components/stripe/StripePayment";
import classNames from "classnames";

function Pagos() {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <main
        className={classNames(
          "flex flex-col justify-center items-center",
          "h-[87svh]"
        )}
      >
        <StripePayment />
      </main>
    </>
  );
}

export default Pagos;
