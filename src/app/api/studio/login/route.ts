import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { createStudioToken, studioSessionCookie } from '@/lib/studio-auth';

export const runtime = 'nodejs';

export const POST = async (request: Request) => {
  const passwordHash = process.env.BLOG_STUDIO_PASSWORD_HASH;

  if (!passwordHash) {
    return NextResponse.json(
      { message: 'Set BLOG_STUDIO_PASSWORD_HASH in .env.local first.' },
      { status: 403 }
    );
  }

  const { password } = (await request.json()) as { password?: string };

  if (!password) {
    return NextResponse.json(
      { message: 'Password is required.' },
      { status: 400 }
    );
  }

  const isValidPassword = await bcrypt.compare(password, passwordHash);

  if (!isValidPassword) {
    return NextResponse.json(
      { message: 'Wrong studio password.' },
      { status: 401 }
    );
  }

  const token = await createStudioToken();
  const response = NextResponse.json({ message: 'Welcome back.' });

  response.cookies.set(studioSessionCookie, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
};

