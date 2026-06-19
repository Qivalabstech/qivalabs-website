import { NextRequest } from 'next/server';

interface MandiLeadPayload {
  businessName: string;
  ownerName: string;
  whatsapp: string;
  city: string;
  monthlyVolume?: string;
  painPoint?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: MandiLeadPayload = await request.json();

    if (!body.businessName?.trim() || !body.ownerName?.trim() || !body.whatsapp?.trim()) {
      return Response.json(
        { error: 'businessName, ownerName, and whatsapp are required.' },
        { status: 400 }
      );
    }

    const lead = {
      type: 'mandi-enrollment',
      businessName: body.businessName.trim(),
      ownerName: body.ownerName.trim(),
      whatsapp: body.whatsapp.trim(),
      city: body.city?.trim() ?? '',
      monthlyVolume: body.monthlyVolume ?? '',
      painPoint: body.painPoint?.trim() ?? '',
      receivedAt: new Date().toISOString(),
    };

    console.log('[QivaLabs /api/leads/mandi] New enrollment lead:', lead);

    // Forward to external webhook if configured
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      }).catch((err) => console.error('[QivaLabs webhook] Failed:', err));
    }

    return Response.json({ success: true, message: 'Enrolled. We\'ll contact you shortly!' }, { status: 200 });
  } catch (err) {
    console.error('[QivaLabs /api/leads/mandi] Error:', err);
    return Response.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
