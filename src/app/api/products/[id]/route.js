import { NextResponse } from "next/server";

// FETCH SINGLE PRODUCT BY ID
export const GET = async (req, { params }) => {
  try {
    const { id } = params; 

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Product is required " }),
        { status: 400 }
      );
    }

    const response = await fetch(`http://localhost:9090/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `Error: Failed to fetch product. Status: ${response.status}`
      );
      throw new Error("Failed to fetch product");
    }

    const product = await response.json();    

    return new NextResponse(JSON.stringify(product), { status: 200 });
    
  } catch (err) {
    console.error("Fetch error:", err.message);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
