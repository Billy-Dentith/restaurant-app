import { NextResponse } from "next/server";

// FETCH ALL PRODUCTS
export const GET = async (req) => {
  try {   
    const url = new URL(req.url);
    const category = url.searchParams.get('category');        

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: 'Category is required' }),
        { status: 400 }
      );
    }

    const response = await fetch(`http://localhost:9090/api/products?category=${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Error: Failed to fetch products. Status: ${response.status}`);
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.error('Fetch error:', err.message);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
