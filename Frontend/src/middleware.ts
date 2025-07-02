import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest){
    const { pathname } = request.nextUrl;
    console.log("👀 Middleware is running!")

    if(pathname.startsWith("/administrator/home")){
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/adminTokenAuthentication`,{
                method: "POST",
                headers:{
                    cookie: request.headers.get("cookie") || ""
                }
            });
            if(res.status !== 200){
                return NextResponse.redirect(new URL("/administrator", request.url))
            }
        } catch (error) {
            console.log(error)
        }
    }
    if(pathname.startsWith("/home")){
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_USER_API}/tokenValidation`,{
                method: "POST",
                headers:{
                    cookie: request.headers.get("cookie") || ""
                }
            });
            if(res.status !== 200){
                return NextResponse.redirect(new URL("/", request.url))
            }
        } catch (error) {
            console.log(error)
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher:["/administrator/home/:path*", "/home/:path*"],
}