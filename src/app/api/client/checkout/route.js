import DB from '@/lib/db';
import { NextResponse } from 'next/server';
import Cart from '@/models/cart.model';
import Order from '@/models/order.model';
import Product from '@/models/product.model';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_SECRET,
});

DB();

export async function POST(request) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const {
      cartId,
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      city,
      state,
      pinCode,
    } = reqBody;

    console.log('Request body:', reqBody);

    // Validate required fields
    if (!cartId) {
      return NextResponse.json(
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    // Validate shipping information
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !streetAddress ||
      !city ||
      !state ||
      !pinCode
    ) {
      return NextResponse.json(
        { error: 'Complete shipping information is required' },
        { status: 400 }
      );
    }

    // Find the cart
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    // Check if cart is empty
    if (cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Check if product is in stock
    for (const item of cart.items) {
      const product = item.productId;
      if (product.inStock < item.quantity) {
        return NextResponse.json(
          {
            error: `Product ${product.name} is out of stock or has insufficient quantity`,
          },
          { status: 400 }
        );
      }
    }

    // Create order items and calculate total
    // Create order items and calculate total
    const orderItems = [];
    let total = 0;

    for (const item of cart.items) {
      // Get the product from the database to ensure we have the latest stock information
      const product = await Product.findById(item.productId);

      if (!product) {
        return NextResponse.json(
          { error: `Product with ID ${item.productId} not found` },
          { status: 404 }
        );
      }

      // Check if the product has enough stock
      if (product.inStock < item.quantity) {
        return NextResponse.json(
          {
            error: `Product ${product.name} is out of stock or has insufficient quantity`,
          },
          { status: 400 }
        );
      }

      const orderItem = {
        productId: item.productId, // Use the ID directly
        quantity: item.quantity,
        price: product.price,
      };

      orderItems.push(orderItem);
      total += product.price * item.quantity;

      // Update product stock
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { inStock: -item.quantity },
      });
    }

    // Create new order with the updated schema fields
    const newOrder = new Order({
      userId: cart.userId,
      name: `${firstName} ${lastName}`,
      email,
      phoneNumber,
      items: orderItems,
      total,
      shippingAddress: {
        locality: streetAddress,
        city,
        state,
        pincode: pinCode,
      },
      status: 'pending',
      paymentStatus: 'pending',
    });

    // Save the order
    const savedOrder = await newOrder.save();

    // Clear the cart after order creation
    cart.items = [];
    await cart.save();

    const order = await razorpay.orders.create({
      amount: total * 100, // Amount in paise
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    });

    return NextResponse.json(
      { orderId: order.id, order: savedOrder, amount: total },
      {
        message: 'Order created successfully',
        success: true,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
