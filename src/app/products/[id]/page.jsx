"use client"

import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import EditProductForm from "@/components/EditProductForm";
import { Price } from "@/components/Price";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SingleProduct = ({ params }) => {
  const { id } = params;  
  const [isEditing, setIsEditing] = useState(false); 
  const [productData, setProductData] = useState(null); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
            cache: "no-store",
        });
    
        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }
    
        const data = await response.json();
        setProductData(data.product); 
      } catch (error) {
          console.error("Failed to fetch product:", error.message);
          throw error;
      }
    }
    
    fetchProduct(); 
  }, [id])

  if (!productData) return (
    <div className="p-4 h-screen flex justify-around items-center">
      <p className="text-xl text-center text-red-500">Loading...</p>
    </div>
  )

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative">
      {/* IMAGE CONTAINER */}
      {productData.image && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={productData.image}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">{productData.title}</h1>
        <p>{productData.description}</p>
        <Price
          product={productData}
        />
      </div>
      {isEditing && <EditProductForm id={id} product={productData} setIsEditing={setIsEditing} setProductData={setProductData} />}
      <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
      <DeleteButton id={id} />
    </div>
  );
};

export default SingleProduct;
