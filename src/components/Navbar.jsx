"use client"

import Image from "next/image";
import Menu from "./Menu";
import Link from "next/link";
import React from "react";
import CartIcon from "./CartIcon";
import { UserLinks } from "./UserLinks";
import { useSession } from "next-auth/react";

const Navbar = () => {
    const { data:session, status } = useSession(); 

    return (
        <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-20 lg:px-20 xl:px-40">
            {/* LEFT LINKS */}
            <div className="hidden md:flex gap-4 flex-1">
                <Link href="/">Homepage</Link>
                <Link href="/menu">Menu</Link>
                {(status === "authenticated" && session.is_admin) ? (
                    <Link href="/add">Add Item</Link>
                ) : (
                    <Link href="/">Contact</Link>
                )}
            </div>
            {/* LOGO */}
            <div className="text-xl md:font-bold flex-1 md:text-center">
                <Link href="/">
                    Buon Appetito
                </Link>
            </div>
            {/* MOBILE MENU */}
            <div className="md:hidden">
                <Menu />
            </div>
            {/* RIGHT LINKS */}
            <div className="hidden md:flex gap-4 items-center justify-end flex-1">
                <div className="md:absolute top-2 r-2 flex items-center gap-2 cursor-pointer bg-orange-300 px-1 py-1 rounded-md">
                    <Image src="/phone.png" alt="" width={20} height={20} />
                    <span>0208 123 4567</span>
                </div>
                <UserLinks />
                <CartIcon />
            </div>
        </div>
    )
}

export default Navbar;