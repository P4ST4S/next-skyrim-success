import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production'
);

export interface SessionPayload {
  userId: string;
  expiresAt: Date;
}

export const createSession = async (userId: string): Promise<string> => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const token = await new SignJWT({ userId, expiresAt: expiresAt.toISOString() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });

  return token;
};

export const verifySession = async (): Promise<SessionPayload | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    return {
      userId: payload.userId as string,
      expiresAt: new Date(payload.expiresAt as string),
    };
  } catch {
    return null;
  }
};

export const deleteSession = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete('session');
};
