import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/admin-auth';
import { supabase } from '@/lib/supabase';

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// GET /api/admin/jobs — list all job listings + application counts
// GET /api/admin/jobs?applications=<jobId> — list applications for a job
export async function GET(request: NextRequest) {
  if (!(await requireAdminSession())) return unauthorized();
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('applications');

  if (jobId) {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  const { data: jobs, error: jobsErr } = await supabase
    .from('job_listings')
    .select('*')
    .order('created_at', { ascending: false });
  if (jobsErr) return NextResponse.json({ error: jobsErr.message }, { status: 500 });

  const { data: apps } = await supabase
    .from('job_applications')
    .select('job_id');

  const counts: Record<string, number> = {};
  (apps ?? []).forEach((a) => { counts[a.job_id] = (counts[a.job_id] ?? 0) + 1; });

  return NextResponse.json((jobs ?? []).map((j) => ({ ...j, application_count: counts[j.id] ?? 0 })));
}

// POST /api/admin/jobs — create a job listing
export async function POST(request: NextRequest) {
  if (!(await requireAdminSession())) return unauthorized();
  const body = await request.json();
  const { title, department, location, employment_type, is_commission_based, description, requirements, is_active } = body;
  if (!title || !description) return NextResponse.json({ error: 'title and description are required' }, { status: 400 });

  const slug = slugify(title);
  const { data, error } = await supabase
    .from('job_listings')
    .insert({ title, slug, department, location, employment_type, is_commission_based, description, requirements, is_active })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

// PATCH /api/admin/jobs — update a job listing
export async function PATCH(request: NextRequest) {
  if (!(await requireAdminSession())) return unauthorized();
  const body = await request.json();
  const { id, ...fields } = body;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { error } = await supabase.from('job_listings').update(fields).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE /api/admin/jobs?id=<id>
export async function DELETE(request: NextRequest) {
  if (!(await requireAdminSession())) return unauthorized();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { error } = await supabase.from('job_listings').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
