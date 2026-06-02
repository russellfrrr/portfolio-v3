import { NextResponse, type NextRequest } from 'next/server';
import { studioSessionCookie, verifyStudioToken } from '@/lib/studio-auth';

const openStudioPaths = ['/studio/login', '/api/studio/login', '/api/studio/logout'];

const isOpenStudioPath = (pathname: string) => {
  return openStudioPaths.includes(pathname);
};

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (isOpenStudioPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(studioSessionCookie)?.value;
  const hasValidSession = await verifyStudioToken(token);

  if (hasValidSession) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { message: 'Studio session required.' },
      { status: 401 }
    );
  }

  return NextResponse.redirect(new URL('/studio/login', request.url));
};

export const config = {
  matcher: ['/studio/:path*', '/api/studio/:path*'],
};
