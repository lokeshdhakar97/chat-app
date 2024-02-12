import User from "@/modal/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectMongoDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    await connectMongoDB();
    const isUserExist = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return NextResponse.json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return NextResponse.json({ message: "User creation failed" });
    }

    return NextResponse.json({ message: "User created successfully", newUser });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong", error });
  }
}
