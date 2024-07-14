import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <div className="h-1/2 md:h-24 p-4 lg:px-20 xl:px-40 text-red-500 flex items-center justify-between uppercase">
            <Link href="/" className="font-bold text-xl">Food Hub</Link>
            <p>© ALL RIGHTS RESERVED.</p>
        </div>
    )
}

export default Footer;