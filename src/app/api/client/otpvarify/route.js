import { NextResponse } from 'next/server';
import User from '@/moduls/client';
import DB from '../../../lib/dbconnect';

DB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, otpInput } = reqBody;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not registered" }, { status: 404 });
    }

    // Check if the OTP exists and is valid
    const otpData = user.otp;
    if (!otpData) {
      return NextResponse.json({ error: "OTP not generated" }, { status: 400 });
    }

    // Check if OTP has expired (5 minutes expiry time)
    const currentTime = new Date().getTime();
    const expiryTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    if (currentTime - otpData.createdAt > expiryTime) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    // Compare the input OTP with the generated OTP
    if (otpInput !== otpData.otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // OTP is valid
    return NextResponse.json({ message: "OTP validated successfully" }, { status: 200 });

  } catch (error) {
    console.error('Error in /api/client/validateOtp:', error);
    return NextResponse.json({ error: "An error occurred while validating OTP" }, { status: 500 });
  }
}
