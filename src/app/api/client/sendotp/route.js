import { NextResponse } from 'next/server';
import DB from '@/lib/db';
import sendEmail from '@/helpers/mailer';
import User from '@/models/user.model';

DB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not registered' },
        { status: 404 }
      );
    }

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const createdAt = new Date().getTime(); // Store the current timestamp

    // Save OTP and timestamp in user object (make sure the schema allows this)
    user.otp = { otp, createdAt };
    await user.save();

    // Send OTP via email
    const subject = 'Your One-Time Password for Password Change';
    const text = `Your OTP is: ${otp}. It will expire in 5 minutes.`;
    const html = `
      <h1>Your One-Time Password</h1>
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>It will expire in 5 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;
    await sendEmail({ useremail: email, subject, text, html });

    return NextResponse.json(
      { message: 'OTP sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/client/sendotp:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating OTP' },
      { status: 500 }
    );
  }
}
