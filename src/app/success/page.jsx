"use client"

import { useRouter, useSearchParams } from "next/navigation"
import React, { Suspense, useEffect, useState } from "react";

const SuccessContent = () => {
  const searchParams = useSearchParams(); 
  const router = useRouter();
  const payment_intent = searchParams.get("payment_intent");
  
  useEffect(() => {
    if (payment_intent) {
      const makeRequest = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
            method: "PATCH",
          })

          if (!response.ok) {
            throw new Error("Failed to update order");
          }

          setTimeout(() => {
            router.push('/orders')
          }, 5000);
        } catch (err) {
          console.error(err);
        } 
      }

      makeRequest(); 
    }

  }, [payment_intent, router])

  return (
    <div>
      Payment successful. You are being re-directed to the orders page. Please do not close the page.
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