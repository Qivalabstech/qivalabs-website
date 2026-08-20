-- QivaLabs — Content management schema (services + BDA deal notes)
-- Run this in the Supabase SQL Editor for the vryysnwcraraeyqqppfq project.

-- ─── BDA Deal Notes (updates BDAs log from the field on their own deals) ──
CREATE TABLE IF NOT EXISTS bda_deal_notes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id       UUID NOT NULL REFERENCES bda_deals (id) ON DELETE CASCADE,
  author_email  TEXT NOT NULL DEFAULT '',
  note          TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bda_deal_notes_deal_id ON bda_deal_notes (deal_id);
ALTER TABLE bda_deal_notes ENABLE ROW LEVEL SECURITY;

-- ─── Service Listings (drives the services index page cards) ─────────────
CREATE TABLE IF NOT EXISTS service_listings (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title              TEXT NOT NULL,
  slug               TEXT NOT NULL UNIQUE,
  short_description  TEXT NOT NULL DEFAULT '',
  icon               TEXT NOT NULL DEFAULT '',
  category           TEXT NOT NULL DEFAULT '',
  sort_order         INTEGER NOT NULL DEFAULT 0,
  is_active          BOOLEAN NOT NULL DEFAULT TRUE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_listings_sort_order ON service_listings (sort_order ASC);
ALTER TABLE service_listings ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS update_service_listings_updated_at ON service_listings;
CREATE TRIGGER update_service_listings_updated_at
  BEFORE UPDATE ON service_listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Seed from the current live services index page (31 services)
INSERT INTO service_listings (title, slug, short_description, icon, category, sort_order, is_active)
VALUES
  ('Digital Marketing', 'digital-marketing', 'Turn your online presence into a predictable growth engine.', '📣', 'Digital & Marketing', 0, TRUE),
  ('Branding & Identity', 'branding-identity', 'Build a brand identity that makes you instantly recognisable.', '🎨', 'Digital & Marketing', 1, TRUE),
  ('Website Design & Development', 'website-design-development', 'Websites that look great, load fast, and convert visitors into clients.', '🌐', 'Digital & Marketing', 2, TRUE),
  ('E-commerce Solutions', 'ecommerce-solutions', 'Sell online with a store built for conversions and scale.', '🛒', 'Digital & Marketing', 3, TRUE),
  ('Custom Software Development', 'custom-software-development', 'Software built for your exact workflows, not the other way around.', '⚙️', 'Software Development', 4, TRUE),
  ('Business Automation', 'business-automation', 'Replace manual, repetitive work with reliable automated workflows.', '🤖', 'AI & Automation', 5, TRUE),
  ('Mobile App Development', 'mobile-app-development', 'Build mobile experiences your users will actually use, and recommend.', '📱', 'Software Development', 6, TRUE),
  ('Enterprise Web Applications', 'enterprise-web-applications', 'Scalable web platforms built for complex organisations and demanding workloads.', '🏢', 'Software Development', 7, TRUE),
  ('CRM & ERP Solutions', 'crm-erp-solutions', 'Unify your sales, operations, and data in a single system that grows with you.', '📊', 'Software Development', 8, TRUE),
  ('Loan Origination Software (LOS)', 'loan-origination-software', 'Digitise and accelerate your entire credit lifecycle, from application to disbursement.', '🏦', 'Software Development', 9, TRUE),
  ('AI-Integrated Automation', 'ai-integrated-automation', 'Integrate practical AI into your business operations, not just demos.', '🧠', 'AI & Automation', 10, TRUE),
  ('Business Process Automation', 'business-process-automation', 'Automate entire business processes, not just individual tasks.', '🔄', 'AI & Automation', 11, TRUE),
  ('API Development & Integration', 'api-development-integration', 'Connect your systems, eliminate data silos, and automate cross-platform workflows.', '🔌', 'Software Development', 12, TRUE),
  ('Cloud Solutions & Migration', 'cloud-solutions-migration', 'Move to the cloud strategically, with minimal disruption and maximum benefit.', '☁️', 'IT Infrastructure', 13, TRUE),
  ('UI/UX Design', 'ui-ux-design', 'Design digital experiences that are intuitive, beautiful, and conversion-focused.', '🖌️', 'Digital & Marketing', 14, TRUE),
  ('Data Analytics & Business Intelligence', 'data-analytics-bi', 'Transform raw business data into insights that drive better decisions.', '📈', 'IT Infrastructure', 15, TRUE),
  ('Cybersecurity Solutions', 'cybersecurity-solutions', 'Protect your business before attackers find what you haven''t.', '🔒', 'IT Infrastructure', 16, TRUE),
  ('IT Consulting', 'it-consulting', 'Make better technology decisions with expert independent advice.', '💡', 'Support & Consulting', 17, TRUE),
  ('Quality Assurance & Testing', 'quality-assurance-testing', 'Ship software confidently, with systematic testing that catches issues before users do.', '✅', 'Software Development', 18, TRUE),
  ('DevOps & Infrastructure', 'devops-infrastructure', 'Faster deployments, more reliable systems, and infrastructure that scales automatically.', '🛠️', 'IT Infrastructure', 19, TRUE),
  ('Payment Gateway Integration', 'payment-gateway-integration', 'Accept payments seamlessly, with the right gateway for your business model.', '💳', 'Software Development', 20, TRUE),
  ('Third-Party System Integration', 'third-party-system-integration', 'Break down data silos, connect every tool your business runs on.', '🔗', 'Software Development', 21, TRUE),
  ('SaaS Product Development', 'saas-product-development', 'From product idea to scalable SaaS, with a technical team that thinks like a co-founder.', '🚀', 'Software Development', 22, TRUE),
  ('Database Design & Management', 'database-design-management', 'The right data architecture today prevents painful rebuilds tomorrow.', '🗄️', 'IT Infrastructure', 23, TRUE),
  ('SEO & Performance Optimization', 'seo-performance-optimization', 'Rank higher, load faster, and convert more of the traffic you already have.', '⚡', 'Digital & Marketing', 24, TRUE),
  ('Hosting & Domain Management', 'hosting-domain-management', 'Reliable hosting, properly configured, so your sites are always up and performing.', '🖥️', 'IT Infrastructure', 25, TRUE),
  ('Maintenance & AMC', 'maintenance-amc', 'Keep your digital systems healthy, secure, and up to date with a structured maintenance plan.', '🔧', 'Support & Consulting', 26, TRUE),
  ('Technical Documentation & Training', 'technical-documentation-training', 'Turn undocumented systems into well-understood assets your team can independently manage.', '📚', 'Support & Consulting', 27, TRUE),
  ('Customer Support Services', 'customer-support-services', 'Build a customer support function that resolves issues fast and keeps customers loyal.', '🎧', 'Support & Consulting', 28, TRUE),
  ('Dedicated Account Management', 'dedicated-account-management', 'One trusted point of contact, coordinating everything, communicating proactively.', '🤝', 'Support & Consulting', 29, TRUE),
  ('24/7 Technical Support', '24-7-technical-support', 'Round-the-clock coverage for the systems your business cannot afford to have down.', '🌐', 'Support & Consulting', 30, TRUE)
ON CONFLICT (slug) DO NOTHING;
