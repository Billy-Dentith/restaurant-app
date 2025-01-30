"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

const EditButton = ({ setIsEditing, isEditing }) => {
  const { data: session, status } = useSession();  

  if (status === "unauthenticated" || !session.is_admin) {
    return;
  }

  return (
    <button className="bg-red-400 p-2 rounded-full absolute top-4 right-16" onClick={() => setIsEditing(!isEditing)}>
        <Image src="/edit.png" alt="" width={20} height={20} />
    </button>
  )
};

export default EditButton;
