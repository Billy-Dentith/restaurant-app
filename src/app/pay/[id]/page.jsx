"use client"

import CheckoutForm from "@/components/CheckoutForm";
import OrderSummary from "@/components/OrderSummary";
import baseUrl from "@/utils/baseUrl";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PayPage = ({ params }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [currentOrder, setCurrentOrder] = useState({}); 
  const [isLoading, setIsLoading] = useState(true); 

  const { id } = params;    

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/create-intent/${id}`, {
          method: "POST",
        })
        
        const data = await response.json(); 
        setClientSecret(data.clientSecret);

      } catch (err) {
        console.error(err);
      }
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/orders/${id}`, {
          method: "GET",
        })
        
        const data = await response.json();

        setCurrentOrder(data.order); 
        
      } catch (error) {
        console.error(error);
      }
    }

    makeRequest();
    fetchOrder(); 

    setTimeout(() => {
      setIsLoading(false);
    }, 500)

  }, [id]);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };
  
  if (isLoading) return (
    <div className="p-4 h-screen flex justify-around items-center">
      <p className="text-xl text-center text-red-500">Loading...</p>
    </div>
  )

  return (
    <div className="mx-auto w-11/12 m-5 md:m-10">
      <div className="content-center flex flex-col md:flex-row">
        <div className="rounded-t-xl md:rounded-none md:rounded-l-xl bg-gray-100 basis-1/2 p-10">
          <OrderSummary currentOrder={currentOrder} />
        </div>
        <div className="rounded-b-xl md:rounded-none md:rounded-r-xl bg-blue-100 basis-1/2 p-10">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise} key={clientSecret}>
              <CheckoutForm orderTotal={currentOrder.price} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}

export default PayPage;