import DB from '../../../../lib/db';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

import sendEmail from '@/helpers/mailer';
import User from '@/models/user.model';

DB();
//hh
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: 'user already registered' },
        { status: 400 }
      );
    }
    const isArtisan = false;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      name,
      email,
      isArtisan,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Email content
    const subject =
      'Welcome to Management Consulting Camp 2025 – Program Details & Next Steps';
    const text = 'Welcome to MCC 2025';
    const html = `
      
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
      </head>
      <body style="font-family: Arial, sans-serif; color: #333; max-width: 800px; margin: 0 auto; text-align: justify;">
          <h4 style="color:black;">Dear <strong>${name}</strong>,</h4>
          
          <p>We are delighted to welcome you to the <strong>Management Consulting Camp 2025</strong>, organized by the <strong>Consulting Club of NIT Agartala</strong>. Throughout the program, you will gain insights into <strong>business strategy development, market analysis, competitive positioning, financial modeling, and structured problem-solving methodologies</strong>. By the end of the camp, you will be equipped with the analytical frameworks and strategic tools used by top consulting firms worldwide.</p>
          
          <h2 style="color:#3498db;">Program Access & Login Information</h2>
          <p style="color: black; margin-bottom: 20px;">
               The camp officially began on <strong>3rd February 2025</strong>. Below are your credentials to access the 
      sessions and resources: 
          </p>
          
          <table style="width: 100%; border-collapse: collapse; border: 1px solid black; margin-bottom: 20px;">
              <tr>
                  <td style="border: 1px solid black; padding: 8px;"><strong>Website:</strong></td>
                  <td style="border: 1px solid black; padding: 8px;"><a href="https://consultingclubnita.in/mcc"  style="color: #3498db;" target="_blank">consultingclubnita.in/mcc</a></td>
              </tr>
              <tr>
                  <td style="border: 1px solid black; padding: 8px;"><strong>Registered Email:</strong></td>
                  <td style="border: 1px solid black; padding: 8px;">${email}</td>
              </tr>
              <tr>
                  <td style="border: 1px solid black; padding: 8px;"><strong>Password:</strong></td>
                  <td style="border: 1px solid black; padding: 8px;">${password}</td>
              </tr>
          </table>
          
          <p> <span style="color: red;">Please log in using the details above. You may reset your password upon your first login if you 
      wish. If you encounter any technical issues, feel free to reach out to <strong><a href="mailto:team@consultingclubnita.in" style="color:red;">team@consultingclubnita.in</a></strong> for assistance.</span>.</p>
          
          <h2 style="color:#3498db;">Important Next Steps 
      </h2>
          <ul>
              <li ><strong>Register on Lu.ma for Updates & Notifications :</strong>  To ensure seamless communication and receive program-related updates, course materials, and session details,<strong> it is mandatory to register on Lu.ma: <a href="https://lu.ma/fbxgd72g" target="_blank" style="color: #3498db;"> https://lu.ma/fbxgd72g</a> </strong>.</li>
              <li style="margin-top: 10px;"><strong>Familiarize Yourself with the Platform : </strong> Log in (<a href="https:consultingclubnita.in" target="_blank" style="color: #3498db;">https:consultingclubnita.in</a>)  before the camp begins to explore the platform, review the course structure, and ensure your account is set up properly.</li>
              <li style="margin-top: 10px;"><strong>Mark Your Calendar : </strong>  The sessions will be <strong> live and interactive </strong>, so we recommend blocking your schedule in advance to make the most of this opportunity.</li>
          </ul>
          
          
          
          
          <h2 style="color:black;">Follow Us On:</h2>
          <li><a href="https://www.linkedin.com/company/consulting-club-of-nit-agartala" target="_blank" style="color: #3498db;"><strong>LinkedIn</strong></a> </strong>.</li>
          <li><a href="https://www.instagram.com/consulting_club_nita/" target="_blank" style="color: #3498db;"><strong>Instagram</strong></a></li>
          
          <p style="margin-top: 10px;">We look forward to an enriching and engaging learning experience with you. Should you have any queries, feel free to reach out to us at
          <a href="mailto:team@consultingclubnita.in" style="color: #3498db;">team@consultingclubnita.in</a> or
          <a href="mailto:fcc.nitagartala@gmail.com" style="color: #3498db;">fcc.nitagartala@gmail.com</a></p>
      
          </head>
           </html>
  
`;

    await sendEmail({ useremail: savedUser.email, subject, text, html });
    return NextResponse.json({
      message: 'User registered successfully',
      success: true,
      savedUser,
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
