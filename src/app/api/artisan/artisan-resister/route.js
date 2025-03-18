import DB from '../../../../lib/db';
import { NextResponse } from 'next/server';
import sendEmail from '@/helpers/mailer';
import User from '@/models/user.model';
import artisanModel from '@/models/artisan.model';

DB();

export async function POST(request) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const {
      name,
      email,
      imagesBase64,
      bio,
      village,
      state,
      district,
      familyTradition,
      craftname,
      description,
      culturalSignificance,
      materials // Expecting craftDetails as an object from frontend
    } = reqBody;

    console.log(reqBody);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'First sign up as a user' },
        { status: 400 }
      );
    }

    // Check if the artisan already exists
    const existingArtisan = await artisanModel.findOne({ email });
    if (existingArtisan) {
      return NextResponse.json(
        { error: 'Artisan already registered' },
        { status: 400 }
      );
    }

    // Mark user as an artisan
    user.isArtisan = true;
    await user.save();

    // Convert imagesBase64 to Buffer
    const profileImage = imagesBase64?.map((base64) => Buffer.from(base64, 'base64')) || [];

    // Create a new artisan
    const newArtisan = new artisanModel({
      email,
      name,
      profileImage,
      bio,
      location: {
        village,
        state,
        district,
      },
      familyTradition,
      craftDetails:{
        name:craftname,
        description,
        culturalSignificance,
        materials,
      }, // Directly storing the object received from frontend
    });

    // Save the artisan to the database
    const savedArtisan = await newArtisan.save();
    console.log(savedArtisan);

    // Send welcome email
    const subject = 'Welcome to the Artisan Community';
    const text = `Dear ${name}, welcome to the artisan community!`;
    const html = `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2>Dear ${name},</h2>
          <p>Welcome to the artisan community! We are thrilled to have you on board.</p>
          <p>Here are your registration details:</p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Location:</strong> ${village}, ${district}, ${state}</li>
            <li><strong>Family Tradition:</strong> ${familyTradition}</li>
          </ul>
          <p>Thank you for joining us. We look forward to showcasing your craft to the world!</p>
          <p>Best regards,<br/>The Team</p>
        </body>
      </html>
    `;

    await sendEmail({
      useremail: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({
      message: 'Artisan registered successfully',
      success: true,
      artisan: savedArtisan,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
