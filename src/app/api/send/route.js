import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_68MctD4Y_44NYxX9YVEFPS2J7BPhuLzmw");

export async function POST(req, res) {
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
