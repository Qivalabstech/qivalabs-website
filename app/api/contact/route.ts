import { NextRequest } from 'next/server';

interface ContactPayload {
  name: string;
  business?: string;
  email?: string;
  phone: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();

    if (!body.name?.trim() || !body.phone?.trim()) {
      return Response.json(
        { error: 'Name and phone are required.' },
        { status: 400 }
      );
    }

    const contact = {
      type: 'contact-form',
      name: body.name.trim(),
      business: body.business?.trim() ?? '',
      email: body.email?.trim() ?? '',
      phone: body.phone.trim(),
      message: body.message?.trim() ?? '',
      receivedAt: new Date().toISOString(),
    };

    console.log('[QivaLabs /api/contact] New contact form submission:', contact);

    // Forward to external webhook if configured
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      }).catch((err) => console.error('[QivaLabs webhook] Failed:', err));
    }

    return Response.json({ success: true, message: 'Message received. Thank you!' }, { status: 200 });
  } catch (err) {
    console.error('[QivaLabs /api/contact] Error:', err);
    return Response.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
