import { NextResponse } from 'next/server';
import { updateSession } from './backend/utils/supabase/middleware';

export async function middleware(request) {
  try {
    return await updateSession(request);
  } catch (error) {
    console.error('Middleware error:', error);
    // Handle error gracefully, returning a response if needed
    return NextResponse.redirect(new URL('/error', request.url));
  }
}

export const config = {
  matcher: [
    // Match all paths except those starting with the specified patterns or file extensions
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
