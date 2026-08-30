import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    const session = await auth();
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() || 'iceone843@gmail.com';

    // If not logged in or not admin email, redirect to home page
    if (!session || !session.user?.email || session.user.email.trim().toLowerCase() !== adminEmail) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
