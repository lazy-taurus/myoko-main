import Product from '@/models/product.model';
import DB from '../../../../lib/db';
import { NextResponse } from 'next/server';

DB();

export async function POST(request) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { slug } = reqBody;

    console.log(slug);

    // Validate required fields
    if (!slug) {
      return NextResponse.json({ error: 'Slug not found' }, { status: 400 });
    }

    // Fetch product based on ID
    const product = await Product.findOne({ _id: slug });

    // Handle case where no product is found
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Convert Buffer image to Base64 if image exists
    const updatedProduct = product.toObject();
    if (product.image && product.image.data) {
      updatedProduct.image = `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`;
    }

    console.log(updatedProduct);

    return NextResponse.json({
      message: 'Product fetched successfully',
      success: true,
      product: updatedProduct, // Send modified product with base64 image
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
