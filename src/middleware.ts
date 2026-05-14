import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "sl_session";

export function middleware(req: NextRequest) {
  const hasCookie = !!req.cookies.get(SESSION_COOKIE)?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard") && !hasCookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
