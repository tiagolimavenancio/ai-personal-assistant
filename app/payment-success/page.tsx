"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function PaymentSuccess() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.replace("/workspace");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          ${amount}
        </div>

        <p className="mt-6 text-lg">
          Redirecting to your workspace in{" "}
          <span className="font-bold text-white">{countdown}</span> seconds...
        </p>
      </div>
    </main>
  );
}

export default PaymentSuccess;
