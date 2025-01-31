import { NextResponse } from "next/server";

// FETCH ALL PRODUCTS
export const GET = async (req) => {
  try {   
    const url = new URL(req.url);
    const category = url.searchParams.get('category');    
    const isFeatured = url.searchParams.get('isFeatured'); 

    if (!category && !isFeatured) {
      return new NextResponse(
        JSON.stringify({ message: 'Category is required' }),
        { status: 400 }
      );
    }

    if (category) {
      const response = await fetch(`http://localhost:9090/api/products?category=${category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response; 
    } else if (isFeatured) {
      const response = await fetch(`http://localhost:9090/api/products?isFeatured=true`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response; 
    }

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

// POST PRODUCT
export const POST = async (req) => {
  try {   
    const body = await req.json();
    console.log("body in route: ", body);
    

    const response = await fetch(`http://localhost:9090/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`Error: Failed to add product. Status: ${response.status}`);
      throw new Error("Failed to add products");
    }

    const product = await response.json();
    
    return new NextResponse(JSON.stringify(product), { status: 201 });

  } catch (err) {
    console.error('Post error:', err.message);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
