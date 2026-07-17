export async function POST() {
  const response = new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'qivalabs_admin_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0',
    },
  });
  return response;
}
