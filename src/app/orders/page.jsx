"use client";

import RemoveOrder from "@/components/RemoveOrder";
import { formatPrice } from "@/utils/formatPrice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/orders");

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      return response.json();
    },
    enabled: status === "authenticated",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleUpdate = (e, id) => {
    e.preventDefault();

    const status = e.target[0].value;

    mutation.mutate({ id, status });
    toast.success("The order status has been changed!");
  };

  if (isLoading || status === "loading") return "Loading...";

  return (
    <div className="pt-4 p-2 lg:px-10 xl:px-40">
      <table className="w-full border-separate border-spacing-2 text-xs sm:text-base">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.orders.map((item) => {
            const date = item.created_at.replace("T", " ").substring(0, 16);
            const [datePart, time] = date.split(" "); 
            const [year, month, day] = datePart.split("-");

            return (
              <tr
                className={`${
                  item.status === "completed" ? "bg-green-200" : "bg-red-200"
                }`}
                key={item.id}
              >
                <td className="hidden md:table-cell py-4 px-2">{item.id}</td>
                <td className="w-16 lg:w-24 py-4 px-2">
                  {time}
                  <br/>
                  {`${day}/${month}`}
                  <br/>
                  {year}
                </td>
                <td className="py-4 px-2">{formatPrice(item.price)}</td>
                <td className="hidden md:table-cell py-4 px-2">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr className="text-left">
                          <th className="px-2 py-1">Item</th>
                          <th className="px-2 py-1">Size</th>
                          <th className="px-2 py-1">Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.products.map((product) => (
                          <tr className="text-left odd:bg-white even:bg-gray-100" key={product.id + product.optionTitle}>
                            <td className="px-2 py-1">{product.title}</td>
                            <td className="px-2 py-1">{product.optionTitle}</td>
                            <td className="px-2 py-1">{product.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </td>
                {session.is_admin ? (
                  <td>
                    <form
                      className="flex flex-col items-center justify-center gap-2 px-1"
                      onSubmit={(e) => handleUpdate(e, item.id)}
                    >
                      <input
                        placeholder={item.status}
                        className="p-2 ring-1 ring-red-100 rounded-md w-28 md:w-36 lg:w-auto"
                      />
                      <button className="bg-red-400 p-2 flex flex-row rounded-full">
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
                  <td className="py-6 px-2">{item.status}</td>
                )}
                <td className="py-6 px-2">
                  <RemoveOrder id={item.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
