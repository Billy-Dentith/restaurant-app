import { NextResponse } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/route";

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

// DELETE SINGLE PRODUCT BY ID
export const DELETE = async (req, { params }) => {
  try {
    const { id } = params; 
    
    const session = await getAuthSession();

    if(session.is_admin) {
      if (!id) {
        return new NextResponse(
          JSON.stringify({ message: "Product not found..." }),
          { status: 400 }
        );
      }
  
      const response = await fetch(`http://localhost:9090/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        console.error(
          `Error: Failed to delete product. Status: ${response.status}`
        );
        throw new Error("Failed to delete product");
      } 
  
      return new NextResponse(JSON.stringify("Product has been deleted!"), { status: 200 });
    } 
    return new NextResponse(
      JSON.stringify({ message: "You are not allowed!" }),
      { status: 403 }
    );

  } catch (err) {    
    console.error("Fetch error:", err.message);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
