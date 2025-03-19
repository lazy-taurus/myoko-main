import DB from '@/lib/db';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/user.model';
import cartModel from '@/models/cart.model';

DB();

export async function POST(request) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { accessToken, productId } = reqBody;

    // Validate that required fields are provided
    if (!accessToken || !productId) {
      return NextResponse.json(
        { error: 'Access token and product id are required' },
        { status: 400 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.TOKEN);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const deletedItem = await cartModel.findOneAndDelete({
      userId: user._id,
      menuItemId: productId,
    });

    if (!deletedItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Cart item removed successfully', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
