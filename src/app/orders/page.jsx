"use client"

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

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn:({ id, status }) => {
            return fetch(`http://localhost:3000/api/orders/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            })
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["orders"] })
        }
    })
    
    const handleUpdate = (e, id) => {        
        e.preventDefault();
        
        const status = e.target[0].value;

        mutation.mutate({ id, status })
        toast.success('The order status has been changed!')
    }
    
    if (isLoading || status === "loading") return "Loading..."

    return (
        <div className="pt-4 p-2 lg:px-20 xl:px-40">
            <table className="w-full border-separate border-spacing-2">
                <thead>
                    <tr className="text-left">
                        <th className="hidden md:block">Order ID</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th className="hidden md:block">Products</th>
                        <th>Status</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {data.orders.map((item) => {
                        const date = item.created_at.replace('T', ' ').substring(0, 16)

                        return (
                        <tr className={`${item.status === "completed" ? "bg-green-100" : "bg-red-100"}`} key={item.id}>
                            <td className="hidden md:block py-8 px-2">{item.id}</td>
                            <td className="py-6 px-2">{date.split(' ')[0].split('-').reverse().join('-')} {date.split(' ')[1]}</td>
                            <td className="py-6 px-2">{formatPrice(item.price)}</td>
                            <td className="hidden md:block py-8 px-2">{item.products.quantity}</td>
                            {session.is_admin ? (
                                    <td>
                                        <form className="flex flex-col md:flex-row items-center justify-center gap-2 px-1" onSubmit={(e) => handleUpdate(e, item.id)}>
                                            <input placeholder={item.status} className="p-2 ring-1 ring-red-100 rounded-md w-24 md:w-auto"/>
                                            <button className="bg-red-400 p-2 rounded-full">
                                                <Image src="/edit.png" alt="edit order" width={20} height={20} 
                                                />
                                            </button>
                                        </form>
                                    </td>
                                ) : (
                                    <td className="py-6 px-2">{item.status}</td>
                            )}
                            <td className="py-6 px-2">
                                <button className="bg-red-400 flex justify-self-center p-2 rounded-full">
                                    <Image src="/delete.png" alt="remove order" width={20} height={20} />
                                </button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersPage;