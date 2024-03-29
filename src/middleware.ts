import { NextResponse, type NextRequest } from "next/server";

const publicPaths = ["/login", "/signup"];
const privatePaths = ["/profile", "/logout"];

export async function middleware(req: NextRequest) {
  const cookie = await req.cookies.get("token")?.value;

  if (publicPaths.includes(req.nextUrl.pathname) && cookie) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/profile`);
  }

  if (privatePaths.includes(req.nextUrl.pathname) && !cookie) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/:path*"],
};
