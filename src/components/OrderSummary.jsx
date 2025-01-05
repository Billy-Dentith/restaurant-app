import React from "react";

const OrderSummary = () => {
  return (
    <div>
      <h1 className="mb-5 font-semibold text-2xl">Order Summary</h1>
      <ul className="list-disc list-inside">
        <li>Pizza</li>
        <li>Burger</li>
      </ul>
      <div className="mt-5 border-gray-300 border-t-2 pt-5">Total: £100</div>
    </div>
  );
};

export default OrderSummary;
