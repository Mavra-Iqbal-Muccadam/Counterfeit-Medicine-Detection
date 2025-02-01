import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    console.log("Middleware running...");
    
    // If authentication is needed in the future, add logic here

    return NextResponse.next(); // ✅ Continue processing request
  } catch (error) {
    console.error("Middleware error:", error);
    
    // ✅ Redirect to an error page if middleware fails
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
