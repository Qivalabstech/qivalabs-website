import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';

interface ApplyPayload {
  job_id: string;
  applicant_name: string;
  email: string;
  phone?: string;
  resume_url?: string;
  cover_note: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ApplyPayload = await request.json();

    if (!body.job_id || !body.applicant_name?.trim() || !body.email?.trim() || !body.cover_note?.trim()) {
      return Response.json({ error: 'Name, email, job, and cover note are required.' }, { status: 400 });
    }

    const application = {
      job_id: body.job_id,
      applicant_name: body.applicant_name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() ?? '',
      resume_url: body.resume_url?.trim() ?? '',
      cover_note: body.cover_note.trim(),
    };

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { error } = await supabase.from('job_applications').insert(application);
      if (error) {
        console.error('[QivaLabs /api/career/apply] Supabase error:', error);
        return Response.json({ error: 'Failed to submit application.' }, { status: 500 });
      }
    } else {
      console.log('[QivaLabs /api/career/apply] Supabase not configured — logging application:', application);
    }

    // Optional webhook forward
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'job-application', ...application }),
      }).catch(() => {});
    }

    return Response.json({ success: true, message: 'Application received!' }, { status: 200 });
  } catch (err) {
    console.error('[QivaLabs /api/career/apply] Error:', err);
    return Response.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
