import { NextRequest } from 'next/server';

interface CRMLeadPayload {
  companyName: string;
  contactPerson: string;
  email: string;
  currentCRM: string;
  teamSize?: string;
  automationGoal?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CRMLeadPayload = await request.json();

    if (!body.companyName?.trim() || !body.contactPerson?.trim() || !body.email?.trim()) {
      return Response.json(
        { error: 'companyName, contactPerson, and email are required.' },
        { status: 400 }
      );
    }

    const lead = {
      type: 'crm-onboarding',
      companyName: body.companyName.trim(),
      contactPerson: body.contactPerson.trim(),
      email: body.email.trim(),
      currentCRM: body.currentCRM?.trim() ?? '',
      teamSize: body.teamSize ?? '',
      automationGoal: body.automationGoal?.trim() ?? '',
      receivedAt: new Date().toISOString(),
    };

    console.log('[QivaLabs /api/leads/crm] New CRM onboarding lead:', lead);

    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      }).catch((err) => console.error('[QivaLabs webhook] Failed:', err));
    }

    return Response.json({ success: true, message: 'Received! We\'ll be in touch within 24 hours.' }, { status: 200 });
  } catch (err) {
    console.error('[QivaLabs /api/leads/crm] Error:', err);
    return Response.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
