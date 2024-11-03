"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

const RemoveOrder = ({ id }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session.is_admin) {
    return;
  }

  const handleRemoval = async (id) => {
    console.log(id);
    const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
        window.location.reload();
      } else {
        const data = await response.json();
        console.log(data.message);
      }
  };

  return (
    <button
      onClick={() => handleRemoval(id)}
      className="bg-red-400 flex justify-self-center p-2 rounded-full"
    >
      <Image src="/delete.png" alt="remove order" width={20} height={20} />
    </button>
  );
};

export default RemoveOrder;
