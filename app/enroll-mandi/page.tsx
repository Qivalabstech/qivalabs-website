import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Enroll for Mandi WhatsApp Automation — QIVA | QivaLabs',
  description:
    'Enroll your mandi or wholesale business for QIVA — three AI WhatsApp bots that replace your ₹15k/month human staff. ₹20,000 setup + ₹4,000/month. A founder calls you back within the hour.',
  robots: { index: false, follow: true },
};

const MANDI_FORM_FIELDS = [
  {
    id: 'businessName',
    label: 'Business name',
    type: 'text' as const,
    placeholder: 'Agarwal Wholesale Traders',
    required: true,
    autoComplete: 'organization',
  },
  {
    id: 'ownerName',
    label: 'Your name (owner / decision maker)',
    type: 'text' as const,
    placeholder: 'Ramesh Agarwal',
    required: true,
    autoComplete: 'name',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp number',
    type: 'tel' as const,
    placeholder: '+91 98765 43210',
    required: true,
    autoComplete: 'tel',
  },
  {
    id: 'city',
    label: 'Mandi / city',
    type: 'text' as const,
    placeholder: 'Udaipur, Rajasthan',
    required: true,
  },
  {
    id: 'monthlyVolume',
    label: 'Approx. monthly order volume',
    type: 'select' as const,
    placeholder: 'Select volume range',
    required: true,
    options: [
      'Under ₹5 lakh/month',
      '₹5–20 lakh/month',
      '₹20–50 lakh/month',
      '₹50 lakh–₹1 crore/month',
      'Over ₹1 crore/month',
    ],
  },
  {
    id: 'painPoint',
    label: 'What\'s your biggest pain point right now?',
    type: 'textarea' as const,
    placeholder: 'e.g. "I spend 3 hours every morning sending rates to 200 customers. My staff doesn\'t reply on weekends. Customers call at 11pm for order status..."',
    required: false,
    rows: 4,
  },
];

export default function EnrollMandiPage() {
  return (
    <>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-10 font-mono-accent" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services/mandi-whatsapp-automation" className="hover:text-text-primary transition-colors">Mandi Automation</Link>
            <span>/</span>
            <span className="text-text-primary">Enroll</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — context */}
            <ScrollReveal className="lg:sticky lg:top-28">
              <span className="tag mb-5 inline-flex" style={{ background: 'rgba(124,92,255,0.15)', color: '#A78BFA', borderColor: 'rgba(124,92,255,0.35)' }}>
                Enroll for QIVA
              </span>
              <h1
                className="font-heading font-bold text-text-primary mb-5 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                Ready to replace your{' '}
                <span className="gradient-text-violet-cyan">₹15,000/month</span>{' '}
                WhatsApp employee?
              </h1>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                Fill this form and a QivaLabs founder will call you on WhatsApp within approximately
                one hour to understand your business and confirm your setup. We&apos;ll be live within days.
              </p>

              {/* Pricing block */}
              <div
                className="glass rounded-2xl p-6 mb-8"
                style={{ borderColor: 'rgba(124, 92, 255, 0.25)' }}
              >
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 font-mono-accent">Pricing</p>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-heading font-bold text-4xl text-text-primary">₹4,000</span>
                  <span className="text-text-muted">/month</span>
                </div>
                <p className="text-text-muted text-sm mb-4">+ ₹20,000 one-time setup fee</p>
                <div
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(255,120,73,0.07)', border: '1px solid rgba(255,120,73,0.2)' }}
                >
                  <p className="text-xs text-text-muted leading-relaxed">
                    <strong className="text-text-primary">Your ROI:</strong> A human WhatsApp employee costs
                    ₹10,000–₹15,000/month. QIVA costs ₹4,000.
                    You save <strong style={{ color: '#FF7849' }}>₹6,000–₹11,000 every month.</strong>
                  </p>
                </div>
              </div>

              {/* What happens next */}
              <div className="glass rounded-2xl p-6" style={{ borderColor: 'rgba(34,211,238,0.2)' }}>
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 font-mono-accent">What happens after you submit</p>
                <ol className="flex flex-col gap-3">
                  {[
                    'A QivaLabs founder contacts you on WhatsApp within ~1 hour',
                    '20-minute call to understand your business, customers, and data',
                    'We configure and test the bots on our end',
                    'You go live — typically within 24–48 hours of the call',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold font-mono-accent"
                        style={{ background: 'rgba(34,211,238,0.15)', color: '#22D3EE' }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>

            {/* Right — form */}
            <ScrollReveal delay={0.15}>
              <div className="glass rounded-2xl p-8">
                <h2 className="font-heading font-bold text-text-primary text-xl mb-6">
                  Tell us about your business
                </h2>
                <LeadForm
                  fields={MANDI_FORM_FIELDS}
                  endpoint="/leads/mandi"
                  submitLabel="Enroll for Mandi Automation →"
                  successMessage="Enrolled! A QivaLabs founder will contact you on WhatsApp within approximately one hour to confirm your setup."
                />
                <p className="text-text-muted text-xs mt-5 text-center">
                  Or call us directly:{' '}
                  <a href="tel:+917231873730" className="text-accent-cyan hover:underline">+91 7231 873 730</a>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
