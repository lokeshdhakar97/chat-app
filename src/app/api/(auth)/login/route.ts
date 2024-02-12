import { connectMongoDB } from "@/lib/db";
import User from "@/modal/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { username, password } = await req.json();

    const user = await User.findOne({ username });
    if (!user) return NextResponse.json({ message: "User not found" });
    const isParsswordMatch = await bcrypt.compare(password, user.password);

    if (!isParsswordMatch) {
      return NextResponse.json({ message: "Invalid password" });
    }

    const token = sign({ email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return NextResponse.json({ message: "Login success", token, user });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error", error });
  }
}
