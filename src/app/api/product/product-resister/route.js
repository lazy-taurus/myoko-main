import Product from '@/models/product.model';
import DB from '../../../../lib/db';
import { NextResponse } from 'next/server';
import sendEmail from '@/helpers/mailer';
import artisanModel from '@/models/artisan.model';




DB();

export async function POST(request) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { name, description, price, category, imagesBase64, artisanId, inStock } = reqBody;

    //console.log(reqBody);

    // Validate required fields
    if (!name || !description || !price || !category || !artisanId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
 const artisan=artisanModel.findById({_id:artisanId});
 const artisanName=artisan.name;
    const images = imagesBase64
    ? imagesBase64.map((base64) => Buffer.from(base64, 'base64'))
    : [];

  console.log('Converted Images:', images)

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images, 
      artisanId,
      artisanName,
      inStock: inStock || true,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();
    console.log(savedProduct);

    // Send email to the artisan
  ``

    // Return success response
    return NextResponse.json({
      message: 'Product created successfully',
      success: true,
      product: savedProduct,
    });
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}