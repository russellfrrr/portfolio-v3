import { NextResponse } from 'next/server';
import { studioSessionCookie } from '@/lib/studio-auth';

export const POST = async () => {
  const response = NextResponse.json({ message: 'Logged out.' });

  response.cookies.set(studioSessionCookie, '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
};

