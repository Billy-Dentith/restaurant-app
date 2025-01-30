import { NextResponse } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/route";

// FETCH SINGLE PRODUCT BY ID
export const GET = async (req, { params }) => {
  const { id } = params;
  
  if (!id) {
    return new NextResponse(
      JSON.stringify({ message: "Product is required " }),
      { status: 400 }
    );
  }

  try {
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
  const { id } = params;

  if (!id) {
    return new NextResponse(
      JSON.stringify({ message: "Product not found..." }),
      { status: 400 }
    );
  }

  const session = await getAuthSession();

  if (session.is_admin) {
    try {
      
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

      return new NextResponse(JSON.stringify("Product has been deleted!"), {
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
    JSON.stringify({ message: "You are not allowed!" }),
    { status: 403 }
  );
};

// EDIT SINGLE PRODUCT BY ID
export const PATCH = async (req, { params }) => {
  const { id } = params;

  const body = await req.json();

  if (!id) {
    return new NextResponse(
      JSON.stringify({ message: "Product not found..." }),
      { status: 400 }
    );
  }

  const session = await getAuthSession();

  if (session.is_admin) {
    try {
      const response = await fetch(`http://localhost:9090/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      
      if (!response.ok) {
        console.error(
          `Error: Failed to update product. Status: ${response.status}`
        );
        throw new Error("Failed to update product");
      }

      const product = await response.json();

      return new NextResponse(JSON.stringify(product), {
        status: 200,
      });
    } catch (err) {
      console.error("Update error:", err.message);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  }
  return new NextResponse(
    JSON.stringify({ message: "You are not allowed!" }),
    { status: 403 }
  );
};
