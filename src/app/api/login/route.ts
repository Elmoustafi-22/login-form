import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../lib/mongoose";
import { User } from "../../../../models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await mongooseConnect();

  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful!" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unexpected error occured"}, { status: 500 });
  }
}