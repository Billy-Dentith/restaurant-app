import { NextResponse } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/route";
import baseUrl from "../..";

// PATCH ORDER
export const PATCH = async (req, { params }) => {
    const { id } = params;    

    const body = await req.json();
    const { status } = body; 

    try {
        const response = await fetch(`${baseUrl}/orders/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            console.error(
                `Error: Failed to patch order. Status: ${response.status}`
              );
              throw new Error("Failed to patch order");
        }

        const order = await response.json();
        return new NextResponse(
            JSON.stringify({ message: "Order has been updated!"}), 
            { status: 200 }
        );

    } catch (err) {
        console.log(err);
        
        console.error("Fetch error:", err.message);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!"}),
            { status: 500}
        );
    }
}

// DELETE ORDER BY ID
export const DELETE = async (req, { params }) => {
    const { id } = params;

    if (!id) {
        return new NextResponse(
            JSON.stringify({ message: "Order not found..."}),
            { status: 400 }
        )
    }

    const session = await getAuthSession()

    if (session.is_admin) {
        try {
            const response = await fetch(`${baseUrl}/orders/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                console.error(
                  `Error: Failed to delete order. Status: ${response.status}`
                );
                throw new Error("Failed to delete order");
              }
        
            return new NextResponse(JSON.stringify("Order has been deleted!"), {
            status: 200,
            });
        } catch (err) {
            console.error("Delete error:", err.message);
            return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            { status: 500 }
            );
        }
    }
    return new NextResponse(
        JSON.stringify({ message: "You are not allowed!"}),
        { status: 403 }
    )
}


// GET ORDER BY ID
export const GET = async (req, { params }) => {
    const { id } = params; 

    try {
        const response = await fetch(`${baseUrl}/orders/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            console.error(
                `Error: Failed to get order. Status: ${response.status}`
              );
              throw new Error("Failed to get order");
        }

        const order = await response.json();
        return new NextResponse(JSON.stringify(order), { status: 200 });

    } catch (err) {
        console.error("Fetch error:", err.message);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!"}),
            { status: 500}
        );
    }
}