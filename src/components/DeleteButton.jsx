"use client"

import Image from "next/image"
import { useSession } from "next-auth/react"

const DeleteButton = ({ id }) => {
  const { data:session, status } = useSession(); 

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated" || !session.is_admin) {
    return; 
  }  

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE"
    })

    if (res.status === 200) {
      window.location.href = "/menu";
    } else {
      const data = await res.json();
      console.log(data.message);
    }
  }

  return (
    <button className="bg-red-400 p-2 rounded-full absolute top-4 right-4" onClick={() => handleDelete(id)}>
      <Image src="/delete.png" alt="" width={20} height={20}/>
    </button>
  )
}

export default DeleteButton