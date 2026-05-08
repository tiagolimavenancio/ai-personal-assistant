"use client";

import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { WalletCardsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function CheckoutPage({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not initialized");
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (confirmError) {
      setErrorMessage(confirmError.message);
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 border rounded-xl">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-lg">Pro Plan</h2>
          <h2>500,000 Tokens</h2>
        </div>
        <h2 className="font-bold text-lg">${amount}/Month</h2>
      </div>
      <hr className="my-3" />

      <form className="bg-white rounded-md" onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}
        {errorMessage && (
          <div className="flex text-wrapw-full text-red-500">
            {errorMessage}
          </div>
        )}

        <Button
          type="submit"
          className="text-white w-full p-5 bg-black mt-2 disabled:opacity-50 disabled:animate-pulse"
          disabled={!stripe || loading}
        >
          {!loading ? (
            <div className="flex gap-2 justify-center">
              <WalletCardsIcon /> Upgrade ${amount}
            </div>
          ) : (
            "Processing..."
          )}
        </Button>
      </form>
    </div>
  );
}

export default CheckoutPage;
