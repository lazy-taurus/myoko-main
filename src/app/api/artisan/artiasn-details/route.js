import artisanModel from "@/models/artisan.model";
import DB from "../../../../lib/db";
import { NextResponse } from "next/server";

DB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { slug } = reqBody;

    console.log(slug);

    if (!slug) {
      return NextResponse.json({ error: "Slug not found" }, { status: 400 });
    }

    // Fetch the artisan based on ID
    const artisan = await artisanModel.findById({ _id: "3511a3d1-1a0e-4d69-a6f9-95f748671690"});
    console.log(artisan,"here")

    if (!artisan) {
      return NextResponse.json({ error: "Artisan not found" }, { status: 404 });
    }

    // Convert Buffer image to Base64 if available
    let formattedArtisan = artisan.toObject();

    if (artisan.profileImage && artisan.profileImage.data) {
      formattedArtisan.profileImage = `data:${artisan.profileImage.contentType};base64,${artisan.profileImage.data.toString("base64")}`;
    }

    console.log(formattedArtisan);

    return NextResponse.json({
      message: "Artisan fetched successfully",
      success: true,
      artisan: formattedArtisan, // Send artisan with base64 image
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
