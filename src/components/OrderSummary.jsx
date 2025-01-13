import React from "react";
import OrderSummaryCard from "./OrderSummaryCard";
import { formatPrice } from "@/utils/formatPrice";

const OrderSummary = ({ currentOrder }) => {
  return (
    <div>
      <h1 className="mb-5 font-semibold text-2xl">Order Summary</h1>
      <ul className="list-none list-inside">
        {currentOrder.products && currentOrder.products.map((product) => (
          <OrderSummaryCard key={product.id} product={product} />
        ))}
      </ul>
      <div className="mt-5 mr-7 border-gray-300 border-t-2 pt-5 flex justify-between">
        <p>Total:</p>
        <p>{formatPrice(currentOrder.price)}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
