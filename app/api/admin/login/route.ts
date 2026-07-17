import { NextRequest } from 'next/server';
import { SignJWT } from 'jose';

const ADMIN_SESSION_COOKIE = 'qivalabs_admin_session';
const SESSION_DURATION = 60 * 60 * 8; // 8 hours

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET ?? 'fallback-secret-change-in-production';
  return new TextEncoder().encode(secret);
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('[Admin] ADMIN_PASSWORD env var not set');
      return Response.json({ error: 'Admin not configured.' }, { status: 500 });
    }

    if (!password || password !== adminPassword) {
      return Response.json({ error: 'Invalid password.' }, { status: 401 });
    }

    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(`${SESSION_DURATION}s`)
      .sign(getSecret());

    const response = Response.json({ success: true });
    const headers = new Headers(response.headers);

    const cookieValue = [
      `${ADMIN_SESSION_COOKIE}=${token}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Strict',
      `Max-Age=${SESSION_DURATION}`,
      process.env.NODE_ENV === 'production' ? 'Secure' : '',
    ]
      .filter(Boolean)
      .join('; ');

    headers.set('Set-Cookie', cookieValue);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch {
    return Response.json({ error: 'Internal error.' }, { status: 500 });
  }
}
