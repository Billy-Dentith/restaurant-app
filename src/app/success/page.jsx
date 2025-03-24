"use client"

import { Slider } from "@/components/Slider";
import baseUrl from "@/utils/baseUrl";
import { useCartStore } from "@/utils/store";
import { useRouter, useSearchParams } from "next/navigation"
import React, { Suspense, useEffect } from "react";

const SuccessContent = () => {
  const searchParams = useSearchParams(); 
  const router = useRouter();
  const payment_intent = searchParams.get("payment_intent");

  const { removeAllFromCart } = useCartStore(); 
  
  useEffect(() => {
    if (payment_intent) {
      const makeRequest = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/confirm/${payment_intent}`, {
            method: "PATCH",
          })

          if (!response.ok) {
            throw new Error("Failed to update order");
          }

          removeAllFromCart();

          setTimeout(() => {
            router.push('/orders')
          }, 5000);
        } catch (err) {
          console.error(err);
        } 
      }

      makeRequest(); 
    }

  }, [payment_intent, router, removeAllFromCart])

  return (
    <div className="flex flex-col content-center border-2 border-red-500 rounded-xl m-5 md:m-10 md:mx-auto p-5 md:p-10 w-11/12 md:w-8/12">
      <p className="mb-10 mt-5 md:mt-0 my-16 font-bold text-2xl text-center text-red-500">
        Payment successful. You are being re-directed to the orders page. Please do not close the page.
      </p>
      <Slider imageOnly={true} />
    </div>
  )
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
};

export default SuccessPage