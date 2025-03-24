"use client";

import baseUrl from "@/utils/baseUrl";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const Featured = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/products?isFeatured=true`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const { products } = await response.json();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-4 h-[60vh] flex justify-around items-center">
        <p className="text-xl text-center text-red-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="w-100vw overflow-x-scroll text-red-500">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {products.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w=[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.image && (
              <div className="relative flex-1 w-full hover:rotate-45 transition-all duration-500">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h1>
              <p className="p-4 2xl:p-8">{item.description}</p>
              <span className="text-xl font-bold">
                {formatPrice(item.price)}
              </span>
              <Link
                href={`/products/${item.id}`}
                key={item.id}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Add to Cart
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
