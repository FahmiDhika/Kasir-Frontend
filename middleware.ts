import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  if (request.nextUrl.pathname === "/") {
    const redirectAdmin = request.nextUrl.clone();
    redirectAdmin.pathname = "/login";
    return NextResponse.redirect(redirectAdmin);
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token || !role) {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/login";
      return NextResponse.redirect(redirectAdmin);
    }

    if (role !== "ADMIN") {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/login";
      return NextResponse.redirect(redirectAdmin);
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/kasir")) {
    if (!token || !role) {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/login";
      return NextResponse.redirect(redirectAdmin);
    }

    if (role !== "KASIR") {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/login";
      return NextResponse.redirect(redirectAdmin);
    }
    return NextResponse.next();
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path", "/kasir/:path", "/"],
};
