import { NextResponse } from "next/server";

// PATCH ORDER
export const PATCH = async (req, { params }) => {
    const { id } = params;    

    const body = await req.json();
    const { status } = body; 

    try {
        const response = await fetch(`http://localhost:9090/api/orders/${id}`, {
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

// // GET ORDER 
// export const GET = async ({ params }) => {
//     const { id } = params; 

//     try {
//         const response = await fetch(`http://localhost:9090/api/orders/${id}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//         });

//         if (!response.ok) {
//             console.error(
//                 `Error: Failed to get order. Status: ${response.status}`
//               );
//               throw new Error("Failed to get order");
//         }

//         const order = await response.json();
//         return new NextResponse(JSON.stringify(order), { status: 200 });

//     } catch (err) {
//         console.log(err);
        
//         console.error("Fetch error:", err.message);
//         return new NextResponse(
//             JSON.stringify({ message: "Something went wrong!"}),
//             { status: 500}
//         );
//     }
// }