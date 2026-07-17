import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const COOKIE = 'qivalabs_admin_session';

function secret() {
  return new TextEncoder().encode(
    process.env.ADMIN_SESSION_SECRET ?? 'fallback-secret-change-in-production'
  );
}

export async function requireAdminSession(): Promise<boolean> {
  try {
    const store = await cookies();
    const token = store.get(COOKIE)?.value;
    if (!token) return false;
    await jwtVerify(token, secret());
    return true;
  } catch {
    return false;
  }
}
