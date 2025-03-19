import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import sendEmail from '@/helpers/mailer';
import User from '@/models/user.model';
import DB from '@/lib/db';

DB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not registered' },
        { status: 404 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    const subject = 'Your Password has been Changed';
    const text = `Hello ${user.name},\n\nYour password has been successfully changed. If you did not make this request, please contact support immediately.`;
    const html = `
      <h1>Password Changed Successfully</h1>
      <p>Hello ${user.name},</p>
      <p>Your password has been successfully changed.</p>
      <p>If you did not make this request, please contact support immediately.</p>
    `;

    await sendEmail({ useremail: email, subject, text, html });

    return NextResponse.json(
      { message: 'Password changed successfully and notification email sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/client/changePassword:', error);
    return NextResponse.json(
      { error: 'An error occurred while changing the password' },
      { status: 500 }
    );
  }
}
