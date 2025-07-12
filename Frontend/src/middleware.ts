import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/administrator/home")) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/adminTokenAuthentication`, {
        method: "POST",
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
        credentials:"include"
      });
      console.log(res)
      if (res.status != 200) {
        return NextResponse.redirect(new URL("/administrator", request.url));
      }
    } catch (error) {
      console.error("Error validating admin token", error);
      return NextResponse.redirect(new URL("/administrator", request.url));
    }
  }
  if (pathname.startsWith("/home")) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_USER_API}/tokenValidation`, {
        method: "POST",
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
        credentials:"include"
      });

      if (res.status != 200) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Error validating user token", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}


export const config = {
    matcher:["/administrator/home/:path*", "/home/:path*"],
}