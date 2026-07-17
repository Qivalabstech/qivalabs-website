import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/admin-auth';
import { supabase } from '@/lib/supabase';

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export async function GET() {
  if (!(await requireAdminSession())) return unauthorized();
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  if (!(await requireAdminSession())) return unauthorized();
  const body = await request.json();
  const { title, category, description, tags, highlight, link, is_external, icon, is_visible } = body;
  if (!title || !description) return NextResponse.json({ error: 'title and description are required' }, { status: 400 });

  // Place new item at the end
  const { count } = await supabase.from('portfolio_items').select('id', { count: 'exact', head: true });
  const display_order = (count ?? 0) + 1;

  const { data, error } = await supabase
    .from('portfolio_items')
    .insert({ title, category, description, tags, highlight, link, is_external, icon, display_order, is_visible })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!(await requireAdminSession())) return unauthorized();
  const body = await request.json();
  const { id, ...fields } = body;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { error } = await supabase.from('portfolio_items').update(fields).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  if (!(await requireAdminSession())) return unauthorized();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
