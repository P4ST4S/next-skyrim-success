import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/auth';

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = await verifySession();

    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect logged-in users away from login page
  if (pathname === '/login') {
    const session = await verifySession();

    if (session) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
