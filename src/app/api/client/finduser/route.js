
import { NextResponse } from 'next/server';
import DB from '../../../../lib/db'; 
import User from '@/models/user.model';

DB();
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { accessToken } = reqBody;
//console.log(accessToken);
    if (!accessToken) {
      return NextResponse.json({ error: "Access token is required" }, { status: 400 });
    }

    const user = await User.findOne({ accessToken });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User details fetched successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        isArtisan:user.isArtisan,
        accessToken: user.accessToken, 
      },
    });
  } catch (error) {

    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
