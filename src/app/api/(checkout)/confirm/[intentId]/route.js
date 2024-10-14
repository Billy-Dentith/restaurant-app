import { NextResponse } from "next/server";

export const PATCH = async ({ params }) => {
    const { intentId } = params;

    try {
        const response = await fetch(`http://localhost:9090/api/confirm/${intentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: "Being prepared!" }),
        })
        return new NextResponse(
            JSON.stringify({ message: "Order has been updated!"}), 
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!"}), 
            { status: 500 }
        );
    }
}