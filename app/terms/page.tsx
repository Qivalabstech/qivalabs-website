import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — QivaLabs',
  description: 'Terms of Service for QivaLabs LLP and QIVA Bot.',
};

export default function TermsPage() {
  return (
    <div
      className="min-h-screen py-20 px-4"
      style={{ background: '#0B0B12' }}
    >
      <div className="max-w-3xl mx-auto">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
          style={{ color: '#A0A0B2' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>

        <h1
          className="font-heading font-bold text-4xl mb-2"
          style={{ color: '#F4F4F8' }}
        >
          Terms of Service
        </h1>
        <p className="text-sm mb-10" style={{ color: '#A0A0B2' }}>
          QivaLabs LLP (LLPIN: ACV-6746) · Last updated: June 2025
        </p>

        <div
          className="space-y-8 text-sm leading-relaxed"
          style={{ color: '#A0A0B2' }}
        >
          {/* TODO: Replace with full legal copy drafted by a qualified legal professional */}

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#F4F4F8' }}>1. Acceptance of Terms</h2>
            <p>
              By using QIVA Bot or any services provided by QivaLabs LLP, you agree to these
              Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#F4F4F8' }}>2. Service Description</h2>
            <p>
              QivaLabs LLP provides AI-powered WhatsApp automation bots (Customer Bot, Supplier Bot,
              Owner Bot) for wholesale and mandi businesses. The service is provided on a subscription basis
              at ₹4,000/month plus a one-time setup fee of ₹20,000.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#F4F4F8' }}>3. Acceptable Use</h2>
            <p>
              You agree to use QIVA Bot only for legitimate business communications with your
              customers and suppliers. You must not use the service to send spam, fraudulent messages,
              or messages that violate WhatsApp&apos;s terms or applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#F4F4F8' }}>4. Subscription &amp; Payment</h2>
            <p>
              Subscription fees are billed monthly. The setup fee is collected once before onboarding
              begins. Subscriptions may be cancelled with 30 days written notice to{' '}
              <a href="mailto:sales@qivalabs.com" style={{ color: '#22D3EE' }}>
                sales@qivalabs.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#F4F4F8' }}>5. Limitation of Liability</h2>
            <p>
              QivaLabs LLP&apos;s liability is limited to the subscription fees paid in the preceding
              three months. We are not liable for any indirect, incidental, or consequential damages
              arising from the use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#F4F4F8' }}>6. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall be subject to the
              exclusive jurisdiction of courts in Udaipur, Rajasthan, India.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#F4F4F8' }}>7. Contact</h2>
            <p>
              QivaLabs LLP, Udaipur, Rajasthan, India · LLPIN: ACV-6746 ·{' '}
              <a href="mailto:sales@qivalabs.com" style={{ color: '#22D3EE' }}>
                sales@qivalabs.com
              </a>{' '}
              · +91 7231 873 730
            </p>
          </section>

          <p
            className="text-xs pt-4 italic"
            style={{ borderTop: '1px solid rgba(124,92,255,0.15)', paddingTop: '1.5rem' }}
          >
            This is a placeholder terms-of-service stub. Please replace with full terms
            drafted by a qualified legal professional before going live.
          </p>
        </div>
      </div>
    </div>
  );
}
