import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';

interface ContactPayload {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();

    if (!body.name?.trim() || !body.message?.trim()) {
      return Response.json({ error: 'Name and message are required.' }, { status: 400 });
    }

    const submission = {
      name: body.name.trim(),
      email: body.email?.trim() ?? '',
      phone: body.phone?.trim() ?? '',
      company: body.company?.trim() ?? '',
      service: body.service?.trim() ?? '',
      message: body.message.trim(),
      status: 'new' as const,
    };

    // Primary storage: Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { error } = await supabase.from('contact_submissions').insert(submission);
      if (error) {
        console.error('[QivaLabs /api/contact] Supabase insert error:', error);
      }
    } else {
      console.log('[QivaLabs /api/contact] Supabase not configured — logging submission:', submission);
    }

    // Secondary: optional webhook forward
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...submission, receivedAt: new Date().toISOString() }),
      }).catch((err) => console.error('[QivaLabs webhook] Failed:', err));
    }

    return Response.json({ success: true, message: 'Message received. Thank you!' }, { status: 200 });
  } catch (err) {
    console.error('[QivaLabs /api/contact] Error:', err);
    return Response.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
