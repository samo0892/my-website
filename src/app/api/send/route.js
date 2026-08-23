import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req, res) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const { email, subject, message } = await req.json();
  try {
    const data = await resend.emails.send({
      from: 'hi@sam-codes.com',
      to: 'hi@sam-codes.com',
      subject: subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message submitted:</p>
          <p>Email: {email}</p>
          <p>{message}</p>
        </>
      ),
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
