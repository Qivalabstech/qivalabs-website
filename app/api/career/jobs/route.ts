import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';

const FALLBACK_BDA = {
  id: 'bda-seed',
  title: 'Business Development Associate (Commission-Based)',
  slug: 'business-development-associate',
  department: 'Sales & Business Development',
  location: 'Udaipur, Rajasthan (Remote / Hybrid)',
  employment_type: 'commission',
  is_commission_based: true,
  description:
    "QivaLabs is looking for motivated Business Development Associates to help us grow our client base across Udaipur, Rajasthan, and India.\n\nThis is a commission-based role — you earn 10% on every project you bring in. There's no ceiling on what you can earn.\n\n**What you'll be doing:**\nIdentifying businesses that need websites, mobile apps, AI automation, custom software, or digital marketing — and introducing them to QivaLabs. You'll handle initial outreach and relationship-building; our technical team handles everything from scoping through delivery.\n\n**The commission structure:**\n10% of the project value, paid within 7 days of client payment receipt. On a ₹2 lakh project, that's ₹20,000. On a ₹10 lakh project, that's ₹1,00,000. No fixed salary — purely performance-based.\n\n**Who this is for:**\nSomeone with an existing network of business owners, a background in sales or marketing, or genuine hustle and the ability to start conversations. Prior technology sales experience is helpful but not required.",
  requirements: [
    'Strong communication skills in Hindi and English',
    'Ability to identify and reach business owners and decision-makers',
    'Self-motivated — this role rewards those who create their own pipeline',
    'Basic understanding of what software, websites, and digital marketing do (we will train you on our specific services)',
    'WhatsApp and LinkedIn proficiency for outreach',
    'Based in Udaipur, Rajasthan preferred (remote possible for candidates with strong networks elsewhere)',
  ],
  is_active: true,
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    if (slug === 'business-development-associate') {
      return Response.json({ job: FALLBACK_BDA });
    }
    return Response.json({ job: null }, { status: 404 });
  }

  try {
    const query = supabase.from('job_listings').select('*').eq('is_active', true);
    if (slug) {
      const { data, error } = await query.eq('slug', slug).single();
      if (error || !data) return Response.json({ job: null }, { status: 404 });
      return Response.json({ job: data });
    } else {
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) return Response.json({ jobs: [] });
      return Response.json({ jobs: data ?? [] });
    }
  } catch {
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
