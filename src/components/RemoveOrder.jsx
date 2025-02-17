"use client";

import useOrders from "@/hooks/useOrders";
import Image from "next/image";

const RemoveOrder = ({ id }) => {
  const { deleteOrder } = useOrders(); 

  const handleDelete = () => {
    const isConfirmed = confirm("Are you sure you want to delete this order?");
    
    if (isConfirmed) {
      deleteOrder.mutate(id)
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-400 flex justify-self-center p-2 rounded-full"
    >
      <Image src="/delete.png" alt="remove order" width={20} height={20} />
    </button>
  );
};

export default RemoveOrder;
