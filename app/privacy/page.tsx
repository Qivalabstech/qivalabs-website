import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — QivaLabs',
  description: 'Privacy Policy for QivaLabs LLP and QIVA Bot.',
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm mb-10" style={{ color: '#A0A0B2' }}>
          QivaLabs LLP (LLPIN: ACV-6746) · Last updated: June 2025
        </p>

        <div
          className="prose prose-invert max-w-none space-y-8 text-sm leading-relaxed"
          style={{ color: '#A0A0B2' }}
        >
          {/* TODO: Replace with full legal copy drafted by a qualified legal professional */}

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#F4F4F8' }}>1. Information We Collect</h2>
            <p>
              When you contact us through this website, we collect your name, business name,
              WhatsApp number, and any message you provide. When you use QIVA Bot, we process
              WhatsApp messages on behalf of your business to automate customer and supplier
              communications.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#F4F4F8' }}>2. How We Use Your Data</h2>
            <p>
              We use the information you provide to: (a) respond to your sales enquiries,
              (b) onboard your business to QIVA Bot, and (c) deliver the QIVA Bot service
              (processing WhatsApp messages on your behalf). We do not sell your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#F4F4F8' }}>3. Data Storage &amp; Security</h2>
            <p>
              Business data processed by QIVA Bot is stored securely and accessible only to
              authorised QivaLabs personnel for service delivery purposes. We use industry-standard
              encryption in transit and at rest.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#F4F4F8' }}>4. WhatsApp Data</h2>
            <p>
              QIVA Bot operates via the WhatsApp Business API. Message content is processed
              to fulfil your automation requests. We comply with WhatsApp&apos;s Business Policy
              and do not store message content beyond what is required to operate the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#F4F4F8' }}>5. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at
              any time by contacting us at{' '}
              <a href="mailto:sales@qivalabs.com" style={{ color: '#22D3EE' }}>
                sales@qivalabs.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#F4F4F8' }}>6. Contact</h2>
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
            This is a placeholder privacy policy stub. Please replace with a full policy
            drafted by a qualified legal professional before going live.
          </p>
        </div>
      </div>
    </div>
  );
}
