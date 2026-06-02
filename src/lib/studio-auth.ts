import { jwtVerify, SignJWT } from 'jose';

export const studioSessionCookie = 'russellfrrr_studio_session';

const getJwtSecret = () => {
  const secret = process.env.BLOG_STUDIO_JWT_SECRET;

  if (!secret) {
    throw new Error('BLOG_STUDIO_JWT_SECRET is required.');
  }

  return new TextEncoder().encode(secret);
};

export const createStudioToken = async () => {
  return new SignJWT({ scope: 'studio' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getJwtSecret());
};

export const verifyStudioToken = async (token?: string) => {
  if (!token) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());

    return payload.scope === 'studio';
  } catch {
    return false;
  }
};

