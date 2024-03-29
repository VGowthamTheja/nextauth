import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    delete savedUser.password;
    delete savedUser.forgotPasswordToken;
    delete savedUser.forgotPasswordTokenExpiry;
    delete savedUser.verificationToken;
    delete savedUser.verificationTokenExpiry;

    await sendMail({ email, emailType: "verify", userId: savedUser._id });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      user: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
