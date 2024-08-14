import { Price } from "@/components/Price";
// import { singleProduct } from "@/data";
import Image from "next/image";
import React from "react";

const getProductData = async (id) => {  
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }

    return await response.json();
} catch (error) {
    console.error("Failed to fetch product:", error.message);
    throw error;
}
}

const SingleProduct = async ({ params }) => {
  const { id } = params;  

  const productData = await getProductData(id); 

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      {productData.product.image && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={productData.product.image}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">{productData.product.title}</h1>
        <p>{productData.product.description}</p>
        <Price
          price={productData.product.price}
          id={productData.product.id}
          options={productData.product.options}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
