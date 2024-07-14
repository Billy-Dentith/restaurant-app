import Image from "next/image";
import React from "react";

const CartPage = () => {
    return (
        <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
            {/* PRODUCTS CONTAINER  */}
            <div className="h-2/3 p-4 flex flex-col justify-center overflow-auto lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
                {/* SINGLE ITEM */}
                <div className="flex items-center justify-between mb-4">
                    <Image src="/temporary/p1.png" alt="" width={100} height={100} />
                    <div>
                        <h1 className="uppercase text-xl font-bold">Sicilian</h1>
                        <span>Large</span>
                    </div>
                    <h2 className="font-bold">£24.90</h2>
                    <span className="cursor-pointer">X</span>
                </div>
                {/* SINGLE ITEM */}
                <div className="flex items-center justify-between mb-4">
                    <Image src="/temporary/p1.png" alt="" width={100} height={100} />
                    <div>
                        <h1 className="uppercase text-xl font-bold">Sicilian</h1>
                        <span>Large</span>
                    </div>
                    <h2 className="font-bold">£24.90</h2>
                    <span className="cursor-pointer">X</span>
                </div>
                {/* SINGLE ITEM */}
                <div className="flex items-center justify-between mb-4">
                    <Image src="/temporary/p1.png" alt="" width={100} height={100} />
                    <div>
                        <h1 className="uppercase text-xl font-bold">Sicilian</h1>
                        <span>Large</span>
                    </div>
                    <h2 className="font-bold">£24.90</h2>
                    <span className="cursor-pointer">X</span>
                </div>
                {/* SINGLE ITEM */}
                <div className="flex items-center justify-between mb-4">
                    <Image src="/temporary/p1.png" alt="" width={100} height={100} />
                    <div>
                        <h1 className="uppercase text-xl font-bold">Sicilian</h1>
                        <span>Large</span>
                    </div>
                    <h2 className="font-bold">£24.90</h2>
                    <span className="cursor-pointer">X</span>
                </div>
            </div>
            {/* PAYMENT CONTAINER */}
            <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
                <div className="flex justify-between">
                    <span className="">Subtotal</span>
                    <span className="">£74.70</span>
                </div>
                <div className="flex justify-between">
                    <span className="">Service Cost</span>
                    <span className="">£2.50</span>
                </div>
                <div className="flex justify-between">
                    <span className="">Delivery Cost</span>
                    <span className="text-green-500">FREE</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">£77.20</span>
                </div>
                <button className="bg-red-500 text-white p-3 rounded-md w-1/2 self-center">Checkout</button>
            </div>
        </div>
    )
}

export default CartPage;