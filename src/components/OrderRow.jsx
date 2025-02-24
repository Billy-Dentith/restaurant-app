import React from "react";
import RemoveOrder from "@/components/RemoveOrder";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import OrderProducts from "./OrderProducts";

const OrderRow = ({ order, session, handleUpdate }) => {
  const date = order.created_at.replace("T", " ").substring(0, 16);
  const [datePart, time] = date.split(" ");
  const [year, month, day] = datePart.split("-");

  return (
    <tr
      className={`${
        order.status === "Order Complete!" ? "bg-green-200" : "bg-red-200"
      }`}
      key={order.id}
    >
      <td className="py-4 px-2">{order.id}</td>
      <td className="py-4 px-2">
        {time}
        <br />
        {`${day}/${month}`}
        <br />
        {year}
      </td>
      <td className="py-4 px-2">{formatPrice(order.price)}</td>
      <td className="py-4 px-2">
        <OrderProducts products={order.products} />
      </td>
      {session.is_admin ? (
        <td>
          <form
            className="flex flex-col orders-center justify-center gap-2 p-1"
            onSubmit={(e) => handleUpdate(e, order.id)}
          >
            <select
              required
              defaultValue={order.status}
              className="bg-gray-50 border rounded-lg p-2"
            >
              <option value={order.status} disabled hidden>
                {order.status}
              </option>
              <option value="Being Prepared!">Being Prepared!</option>
              <option value="On Its Way!">On Its Way!</option>
              <option value="Order Complete!">Order Complete!</option>
              <option value="Order Cancelled!">Order Cancelled!</option>
            </select>
            <button className="bg-red-400 p-2 flex flex-row rounded-full items-center justify-center font-semibold">
              <Image
                src="/edit.png"
                alt="edit order"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5"
              />
              <p className="px-2 text-white">Submit</p>
            </button>
          </form>
        </td>
      ) : (
        <td className="py-6 px-2">{order.status}</td>
      )}
      <td className="py-6 px-2">
        <RemoveOrder id={order.id} />
      </td>
    </tr>
  );
};

export default OrderRow;
