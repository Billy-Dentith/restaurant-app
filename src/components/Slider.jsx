"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in London",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide3.jpg",
  },
];

export const Slider = ({ imageOnly }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {imageOnly ? (
        <div className="flex self-center">
          <Image
            src={data[currentSlide].image}
            alt=""
            height={1000}
            width={1000}
          />
        </div>
      ) : (
        <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
          {/* TEXT CONTAINER */}
          <div className="flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold">
            <h1 className="text-5xl text-center uppercase p-5 md:p-10 md:text-6xl xl:text-7xl">
              {data[currentSlide].title}
            </h1>
            <Link
              href={`/menu`}
              className="bg-red-500 text-white text-xl py-4 px-8 rounded-md"
            >
              Order Now
            </Link>
          </div>
          {/* IMAGE CONTAINER */}
          <div className="w-full flex-1 relative">
            <Image
              src={data[currentSlide].image}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
};
