import { NextResponse } from 'next/server';
import DB from '@/lib/db';
import jwt from 'jsonwebtoken';
import User from '@/models/user.model';
import cartModel from '@/models/cart.model';

DB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { accessToken, menuItemId, quantity } = reqBody;

    // Validate required fields
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    if (!menuItemId || !quantity) {
      return NextResponse.json(
        { error: 'menuItemId and quantity are required' },
        { status: 401 }
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.TOKEN);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 402 });
    }

    // Find user by ID extracted from token
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if the cart already contains the item for the user
    let cartItem = await cartModel.findOne({ userId: user._id, menuItemId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await cartModel.create({
        userId: user._id,
        menuItemId,
        quantity,
      });
    }

    return NextResponse.json(
      {
        message: 'Item added to cart successfully',
        success: true,
        data: cartItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
