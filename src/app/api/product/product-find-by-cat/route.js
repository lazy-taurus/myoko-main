import Product from "@/models/product.model";
import DB from "../../../../lib/db";
import { NextResponse } from "next/server";

DB();

export async function POST(request) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { slug } = reqBody;

    console.log(slug);

    // Validate required fields
    if (!slug) {
      return NextResponse.json({ error: "Slug not found" }, { status: 400 });
    }

    // Fetch products based on category
    const products = await Product.find({ category: slug });

    // Convert Buffer images to Base64
    const updatedProducts = products.map((product) => {
      if (product.image && product.image.data) {
        return {
          ...product.toObject(),
          image: `data:${product.image.contentType};base64,${product.image.data.toString("base64")}`,
        };
      }
      return product.toObject();
    });
    console.log(updatedProducts)

    return NextResponse.json({
      message: "Products fetched successfully",
      success: true,
      products: updatedProducts, // Send modified products with base64 images
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
