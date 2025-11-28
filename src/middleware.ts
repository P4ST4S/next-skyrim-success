import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // Allow GET requests (read-only access for everyone)
  if (request.method === "GET") {
    return NextResponse.next();
  }

  // Allow login action (POST to /login or from /login)
  // Server Actions usually post to the current URL.
  // If we are on /login, we allow POST.
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  // For other POST requests (Server Actions for toggling achievements), check auth
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
