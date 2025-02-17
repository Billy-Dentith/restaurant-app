import React from "react";

const OrderProducts = ({ products }) => {
  return (
    <table className="w-full">
      <thead className="bg-gray-100">
        <tr className="text-left">
          <th className="px-2 py-1">Item</th>
          <th className="px-2 py-1">Size</th>
          <th className="px-2 py-1">Qty</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            className="text-left odd:bg-white even:bg-gray-100"
            key={product.id + product.optionTitle}
          >
            <td className="px-2 py-1">{product.title}</td>
            <td className="px-2 py-1">{product.optionTitle}</td>
            <td className="px-2 py-1">{product.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderProducts;
