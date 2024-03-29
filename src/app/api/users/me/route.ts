import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import getDataFromToken from "@/helpers/getDataFromToken";

connect();

export async function POST(req: NextRequest) {
  const userId = await getDataFromToken(req);
  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized", success: false },
      { status: 401 }
    );
  }
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return NextResponse.json(
      { message: "User not found", success: false },
      { status: 404 }
    );
  }

  return NextResponse.json({ user, success: true, message: "User found" });
}
