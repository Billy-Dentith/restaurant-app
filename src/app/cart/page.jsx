"use client";

import { formatPrice } from "@/utils/formatPrice";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const CartPage = () => {
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState();
  const { data: session } = useSession();
  const router = useRouter(); 

  const { products, totalItems, totalPrice, removeFromCart } = useCartStore(); 

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      setIsOverflowing(container.scrollHeight > container.clientHeight);
    }
  }, [products]);

  useEffect(() => {
    if (totalPrice > 5000) {
      setDeliveryCost("FREE")
    } else {
      setDeliveryCost(300)
    }
  }, [totalPrice])

  const handleCheckout = async () => {
    if (!session) {
      router.push("/login");
    } else {
      try {
        const response = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Not Paid!",
            userEmail: session.email,
          })
        });        

        const data = await response.json();         

        if (data !== undefined) {
          router.push(`/pay/${data.order.id}`)
        }
      } catch (err) {
        console.error(err);
      }
    }
  }  

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER  */}
      <div ref={containerRef} className={`h-full p-4 flex flex-col overflow-auto flex-grow lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40 ${isOverflowing ? "" : "justify-center"}`}>
          {/* SINGLE ITEM */}
          {products.length === 0 && (
            <div className="flex flex-col gap-6">
              <p className="text-xl text-center">Unfortunately, your cart is empty. Click the button below to view our menu...</p>
            <Link href="/menu" className="bg-red-500 text-white p-3 rounded-md w-1/2 self-center text-center">Menu</Link>
            </div>
            
          )}
          {products.map((item) => (
            <div className="grid md:grid-cols-[minmax(100px,_250px)_175px_50px_100px_25px] grid-cols-[minmax(100px,_150px)_75px_20px_75px_25px] md:gap-8 gap-4 py-5 self-center" key={item.id + item.optionTitle}>
              <div className="flex items-center">
                <h1 className="uppercase md:text-xl font-bold">{item.title}</h1>
              </div>
              <div className="flex items-center">
                <span className="uppercase md:text-xl font-bold">{item.optionTitle}</span>
              </div>
              <div className="flex items-center">
                <h1 className="uppercase md:text-xl font-bold">{item.quantity}</h1>
              </div>
              <div className="flex items-center">
                <h2 className="md:text-xl font-bold">{formatPrice(item.price)}</h2>
              </div >
              <div className="flex items-center">
                <button className="bg-red-400 p-1 rounded-full" onClick={() => removeFromCart(item)}>
                  <Image src="/delete.png" alt="" width={20} height={20}/>
                </button>
              </div>
            </div>
          ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalItems} items)</span>
          <span className="">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">FREE</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          {typeof deliveryCost === "number" ? (
            <span className="text-green-500">{formatPrice(deliveryCost)}</span>
          ) : (
            <span className="text-green-500">{deliveryCost}</span>
          )}
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          {typeof deliveryCost === "number" ? (
            <span className="font-bold">{formatPrice(totalPrice + deliveryCost)}</span>
          ) : (
            <span className="font-bold">{formatPrice(totalPrice)}</span>
          )}
        </div>
        <button className="bg-red-500 text-white p-3 rounded-md w-1/2 self-center" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
