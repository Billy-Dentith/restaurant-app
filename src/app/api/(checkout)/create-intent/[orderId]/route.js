import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req, { params }) => {
  const { orderId } = params;

  const response = await fetch(`http://localhost:9090/api/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { order } = await response.json(); 

  if (!response.ok) {
    console.error(`Error: Failed to process order. Status: ${response.status}`);
    throw new Error("Failed to process order");
  }

  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.price,
      currency: "gbp",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const response = await fetch(
      `http://localhost:9090/api/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stripe_id: paymentIntent.id }),
      }
    );

    if (!response.ok) {
      console.error(`Error: Failed to patch order. Status: ${response.status}`);
      throw new Error("Failed to patch order");
    }

    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
      }
    );
  } else {
    return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
      status: 404,
    });
  }
};
