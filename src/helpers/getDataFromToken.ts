import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export default function getDataFromToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET!);
    const response = JSON.parse(JSON.stringify(data));
    return response.id;
  } catch (error) {
    return null;
  }
}
