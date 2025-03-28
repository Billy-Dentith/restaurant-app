"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage = () => {
    const { data, status } = useSession();
    const router = useRouter()
    
    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "authenticated") {
        router.push("/")
    }

    return (
        <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] p-4 flex items-center justify-center">
            {/* BOX */}
            <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
                {/* IMAGE CONTAINER */}
                <div className="relative h-1/3 w-full md:h-full md:w-1/2">
                    <Image src="/loginBg.png" alt="" fill className="object-cover" />
                </div>
                {/* FORM CONTAINER */}
                <div className="flex flex-col p-10 gap-8 md:w-1/2">
                    <h1 className="text-xl font-bold xl:text-3xl">Welcome</h1>
                    <p>Log into your account or create a new one: </p>
                    <button className="flex gap-4 p-4 ring-1 ring-blue-100 rounded-md">
                        <Image src="/facebook.png" alt="" width={20} height={20} className="object-contain"/>
                        <span>Sign in with Facebook</span>
                    </button>
                    <button className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md" onClick={() => signIn('google')}>
                        <Image src="/google.png" alt="" width={20} height={20} className="object-contain"/>
                        <span>Sign in with Google</span>
                    </button>
                    <p className="text-sm">Have a problem? <Link href="/" className="underline">Contact Us</Link></p>
                </div>    
            </div>
        </div>
    )
}

export default LoginPage;