"use client"

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const OrdersPage = () => {
    const { status } = useSession();
    const router = useRouter();

    if (status === "unauthenticated") {
        router.push('/');
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/api/orders')
            
            if (!response.ok) {
                throw new Error('Failed to fetch orders')
            }

            return response.json(); 
        },
        enabled: status === "authenticated"
    })

    if (isLoading || status === "loading") return "Loading..."

    return (
        <div className="p-4 lg:px-20 xl:px-40">
            <table className="w-full border-separate border-spacing-3">
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
                        return (
                        <tr className="text-sm md:text-base bg-red-100" key={item.id}>
                            <td className="hidden md:block py-6 px-1">{item.id}</td>
                            <td className="py-6 px-1">22/07/2024</td>
                            <td className="py-6 px-1">{item.price}</td>
                            <td className="hidden md:block py-6 px-1">{item.products.quantity}</td>
                                <td className="py-6 px-1">{item.status}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersPage;