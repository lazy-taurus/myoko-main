import DB from '@/lib/db';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/user.model';
import cartModel from '@/models/cart.model';
import Product from '@/models/product.model';

DB();

export async function POST(request) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { accessToken } = reqBody;

    // Validate the access token
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.TOKEN);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Find the user using the ID from the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch cart items for the user and populate the product details.
    // The field 'menuItemId' should have its ref set to "Product" in your Cart schema.
    const cartItems = await cartModel
      .find({ userId: user._id })
      .populate('menuItemId');

    // Convert any Buffer images in the populated product to Base64
    const updatedCartItems = cartItems.map((item) => {
      const product = item.menuItemId?.toObject
        ? item.menuItemId.toObject()
        : item.menuItemId;
      if (product && product.image && product.image.data) {
        product.image = `data:${
          product.image.contentType
        };base64,${product.image.data.toString('base64')}`;
      }
      return { ...item.toObject(), menuItemId: product };
    });

    return NextResponse.json(
      {
        message: 'Cart items fetched successfully',
        success: true,
        data: updatedCartItems,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
