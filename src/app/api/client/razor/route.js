import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Ensure environment variables are set
if (!process.env.RAZOR_ID || !process.env.RAZOR_SECRET) {
  throw new Error('Missing Razorpay credentials in environment variables.');
}

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_SECRET,
});

export async function POST() {
  try {
    console.log(111);
    // Optionally, extract a dynamic amount from the request body.
    // If not provided, default to 30000 INR.
    let amount = 35650;

    // Create order. Amount should be in paise.
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Math.random().toString(36).substring(7)}`,
    });

    return NextResponse.json(
      { orderId: order.id, amount: order.amount, currency: order.currency },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Error creating order' },
      { status: 500 }
    );
  }
}
