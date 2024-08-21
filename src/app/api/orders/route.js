import { NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/route";

// FETCH ALL ORDERS
export const GET = async () => {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }),
        { status: 401 }
      );
    }

    let url = "http://localhost:9090/api/orders";

    if (session.is_admin) {
      url += `?userEmail=${encodeURIComponent(session.user.email)}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `Error: Failed to fetch orders. Status: ${response.status}`
      );
      throw new Error("Failed to fetch orders");
    }

    const orders = await response.json();
    return new NextResponse(JSON.stringify(orders), { status: 200 });
    
  } catch (err) {
    console.error("Fetch error:", err.message);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
