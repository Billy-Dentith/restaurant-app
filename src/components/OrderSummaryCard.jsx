import { formatPrice } from "@/utils/formatPrice";
import React from "react";

const OrderSummaryCard = ({ product }) => {
  return (
    <div className="my-5">
      <h1 className="font-semibold">{product.title}</h1>
      <div className="flex justify-between mx-5 text-gray-700">
        <p>{product.optionTitle}</p>
        <p>{product.quantity}</p>
        <p>{formatPrice(product.price)}</p>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
