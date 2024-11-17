import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../lib/mongoose";
import { User } from "../../../../models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await mongooseConnect();

  const { fullName, email, password } = await req.json();

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({ fullName, email, password: hashedPassword });
  
  try {
    await user.save();
    return NextResponse.json({ message: "User created successfully!" }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "An unexpected error occurrred" }, { status: 500 });
  }
}