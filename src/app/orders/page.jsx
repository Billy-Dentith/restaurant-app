"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import OrderRow from "@/components/OrderRow";
import useOrders from "@/hooks/useOrders";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isLoading, data, updateOrder } = useOrders();

  if (status === "unauthenticated") {
    router.push("/");
  }

  const handleUpdate = (e, id) => {
    e.preventDefault();

    const status = e.target[0].value;

    updateOrder.mutate({ id, status });
  };

  if (isLoading || status === "loading") return "Loading...";

  return (
    <div className="pt-4 p-2 lg:px-10 xl:px-40">
      <table className="w-full border-separate border-spacing-2 text-xs sm:text-base">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.orders.map((order) => (
            <OrderRow key={order.id} order={order} session={session} handleUpdate={handleUpdate} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
