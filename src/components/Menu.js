"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { useSession } from "next-auth/react";

const Menu = () => {
  const [open, setOpen] = useState(false);

  const { data: session, status } = useSession();

  return (
    <div>
      {!open ? (
        <Image
          src="/open.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(true)}
        />
      ) : (
        <Image
          src="/close.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(false)}
        />
      )}
      {open && (
        <div className="bg-red-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10">
          <Link href="/" onClick={() => setOpen(false)}>
            Homepage
          </Link>
          <Link href="/menu" onClick={() => setOpen(false)}>
            Menu
          </Link>
          {status === "authenticated" && session.is_admin ? (
            <Link href="/add" onClick={() => setOpen(false)}>
              Add Item
            </Link>
          ) : (
            <Link href="/" onClick={() => setOpen(false)}>
              Contact
            </Link>
          )}
          {status === "authenticated" ? (
            <div className="flex flex-col gap-8">
              <Link href="/orders" onClick={() => setOpen(false)}>
                Orders
              </Link>
              <span
                onClick={() => signOut({ callbackUrl: "/", redirect: true })}
              >
                Logout
              </span>
            </div>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          )}
          <Link href="/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
