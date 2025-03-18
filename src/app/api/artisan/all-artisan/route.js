import artisanModel from "@/models/artisan.model";
import DB from "../../../../lib/db";
import { NextResponse } from "next/server";

DB();

export async function GET() {
  try {
    // Fetch all artisans from the database
    const artisans = await artisanModel.find();

    if (!artisans || artisans.length === 0) {
      return NextResponse.json({ error: "No artisans found" }, { status: 404 });
    }

    // Convert Buffer image to Base64 for each artisan
    const formattedArtisans = artisans.map((artisan) => {
      let formatted = artisan.toObject();

      if (artisan.profileImage && artisan.profileImage.data) {
        formatted.profileImage = `data:${artisan.profileImage.contentType};base64,${artisan.profileImage.data.toString("base64")}`;
      }

      return formatted;
    });

    return NextResponse.json({
      message: "Artisans fetched successfully",
      success: true,
      artisans: formattedArtisans, 
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
