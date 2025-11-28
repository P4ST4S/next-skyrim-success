'use server';

import bcrypt from 'bcryptjs';
import { createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface LoginResult {
  success: boolean;
  error?: string;
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResult> => {
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;

  if (!adminUser || !adminPass) {
    return { success: false, error: 'Server configuration error' };
  }

  // Validate credentials
  if (username !== adminUser) {
    return { success: false, error: 'Invalid credentials' };
  }

  // Check password (support both plain text and bcrypt for flexibility)
  let isPasswordValid = false;

  if (adminPass.startsWith('$2a$') || adminPass.startsWith('$2b$')) {
    // Bcrypt hash
    isPasswordValid = await bcrypt.compare(password, adminPass);
  } else {
    // Plain text (not recommended for production)
    isPasswordValid = password === adminPass;
  }

  if (!isPasswordValid) {
    return { success: false, error: 'Invalid credentials' };
  }

  // Create session
  await createSession(username);

  redirect('/admin/dashboard');
};

export const logout = async (): Promise<void> => {
  await deleteSession();
  redirect('/');
};
