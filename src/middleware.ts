import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    const url = request.nextUrl;

    // Instead of localStorage, use cookies to check the sign-in status
    const fromSignIn = request.cookies.get("fromSignIn")?.value;

    // Public routes that should be accessible without authentication
    const isPublicRoute =
        url.pathname === "/" ||
        url.pathname === "/sign-in" ||
        url.pathname === "/sign-up";

    // Protected routes that require authentication
    const isProtectedRoute =
        url.pathname === "/dashboard" || url.pathname.startsWith("/dashboard/");

    // If user is authenticated and trying to access public routes,
    // redirect them to the appropriate page
    if (token && isPublicRoute) {
        if (fromSignIn === "yeahBro") {
            return NextResponse.redirect(new URL("/user-input", request.url));
        }
        return NextResponse.redirect(new URL("/dashboard/home", request.url));
    }

    // If user is not authenticated and trying to access protected routes,
    // redirect them to sign-in
    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Allow all other cases
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/sign-in",
        "/sign-up",
        "/user-input",
        "/dashboard",
        "/dashboard/:path*",
    ],
};
