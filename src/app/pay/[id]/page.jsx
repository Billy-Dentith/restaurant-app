"use client"

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PayPage = ({ params }) => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = params;    

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/create-intent/${id}`, {
          method: "POST",
        })
        
        const data = await response.json(); 
        setClientSecret(data.clientSecret);

      } catch (err) {
        console.error(err);
      }
    }

    makeRequest();

  }, [id]);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };
  
  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise} key={clientSecret}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default PayPage;