import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Check your credentials" },
        { status: 400 }
      );
    }

    const token = await jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    const response = NextResponse.json({
      message: "Logged in successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
