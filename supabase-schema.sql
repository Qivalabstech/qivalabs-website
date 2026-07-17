-- QivaLabs Website — Supabase Schema
-- Run this in the Supabase SQL Editor after creating your project

-- ─── Contact Submissions ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL DEFAULT '',
  phone       TEXT NOT NULL DEFAULT '',
  company     TEXT NOT NULL DEFAULT '',
  service     TEXT NOT NULL DEFAULT '',
  message     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for sorting by date in admin
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions (created_at DESC);

-- ─── Job Listings ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_listings (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title               TEXT NOT NULL,
  slug                TEXT NOT NULL UNIQUE,
  department          TEXT NOT NULL DEFAULT '',
  location            TEXT NOT NULL DEFAULT 'Udaipur, Rajasthan (Remote / Hybrid)',
  employment_type     TEXT NOT NULL DEFAULT 'full-time' CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'commission')),
  is_commission_based BOOLEAN NOT NULL DEFAULT FALSE,
  description         TEXT NOT NULL DEFAULT '',
  requirements        TEXT[] NOT NULL DEFAULT '{}',
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_job_listings_is_active ON job_listings (is_active);
CREATE INDEX idx_job_listings_slug ON job_listings (slug);

-- ─── Job Applications ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_applications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id          UUID NOT NULL REFERENCES job_listings (id) ON DELETE CASCADE,
  applicant_name  TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL DEFAULT '',
  resume_url      TEXT NOT NULL DEFAULT '',
  cover_note      TEXT NOT NULL DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_job_applications_job_id ON job_applications (job_id);
CREATE INDEX idx_job_applications_created_at ON job_applications (created_at DESC);

-- ─── Portfolio Items ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS portfolio_items (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT NOT NULL,
  category       TEXT NOT NULL DEFAULT '',
  description    TEXT NOT NULL DEFAULT '',
  tags           TEXT[] NOT NULL DEFAULT '{}',
  highlight      TEXT NOT NULL DEFAULT '',
  link           TEXT,
  is_external    BOOLEAN NOT NULL DEFAULT FALSE,
  icon           TEXT NOT NULL DEFAULT '',
  display_order  INTEGER NOT NULL DEFAULT 0,
  is_visible     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_portfolio_items_display_order ON portfolio_items (display_order ASC);

-- ─── Seed: Portfolio Items (from existing hardcoded data) ─────────────
INSERT INTO portfolio_items (title, category, description, tags, highlight, link, is_external, icon, display_order, is_visible)
VALUES
  (
    'WaitJI AI',
    'AI Product',
    'India''s first AI ad marketplace that monetises the idle wait time inside developer tools (Claude Code, Copilot, and similar AI coding assistants). A full-stack SaaS platform with publisher SDK, advertiser dashboard, and real-time impression delivery.',
    ARRAY['AI / ML', 'SaaS', 'Next.js', 'Node.js'],
    'Launched to market · External product',
    'https://waitjiai.in',
    TRUE,
    '⏱️',
    1,
    TRUE
  ),
  (
    'QIVA Bot (Mandi WhatsApp Automation)',
    'AI Automation',
    'A multi-bot WhatsApp automation system for wholesale mandi businesses in India. Three specialised AI bots handle customer orders, supplier management, and owner analytics — replacing manual WhatsApp staff and running 24/7.',
    ARRAY['WhatsApp API', 'AI', 'Automation', 'Node.js'],
    'Active clients · Udaipur, Rajasthan',
    NULL,
    FALSE,
    '🤖',
    2,
    TRUE
  ),
  (
    'Jharokha Haveli',
    'Hospitality Website',
    'Heritage boutique hotel website for a property in Udaipur. Features an immersive full-screen design with rich photography, room booking inquiry forms, dining and amenities pages, and local area guides. Built on Next.js with Tailwind v4.',
    ARRAY['Next.js', 'Tailwind CSS', 'UX Design', 'SEO'],
    'Udaipur heritage hotel',
    NULL,
    FALSE,
    '🏰',
    3,
    TRUE
  ),
  (
    'Surbhi Ed-Tech Platform',
    'Education Technology',
    'A comprehensive multi-page ed-tech platform for an education brand. Includes course listings, student portals, instructor profiles, payment integration, and a demo authentication system. 13 pages built on Next.js 16 with modern UI.',
    ARRAY['Next.js', 'Ed-Tech', 'Payments', 'TypeScript'],
    'Full platform · 13 pages',
    NULL,
    FALSE,
    '📚',
    4,
    TRUE
  ),
  (
    'AI CRM Automation',
    'AI Integration',
    'An intelligent AI layer built on top of CRM systems (Zoho, HubSpot, Freshdesk) for B2B support teams. Automatically triages inbound emails and messages into three tiers: auto-resolved, agent-assisted, and human escalation.',
    ARRAY['LLM Integration', 'CRM', 'AI', 'Python'],
    'B2B SaaS product',
    NULL,
    FALSE,
    '🧠',
    5,
    TRUE
  ),
  (
    'Print Support Platform',
    'Web Application',
    'A full-stack printer support platform with React/Vite frontend and Express backend. Features real-time live chat with Socket.io, agent and admin dashboards, job tracking, and customer support workflows for a printer service business.',
    ARRAY['React', 'Express', 'Socket.io', 'Node.js'],
    'Real-time support system',
    NULL,
    FALSE,
    '🖨️',
    6,
    TRUE
  );

-- ─── Seed: BDA Job Listing ────────────────────────────────────────────
INSERT INTO job_listings (title, slug, department, location, employment_type, is_commission_based, description, requirements, is_active)
VALUES (
  'Business Development Associate (Commission-Based)',
  'business-development-associate',
  'Sales & Business Development',
  'Udaipur, Rajasthan (Remote / Hybrid)',
  'commission',
  TRUE,
  E'QivaLabs is looking for motivated Business Development Associates to help us grow our client base across Udaipur, Rajasthan, and India.\n\nThis is a commission-based role — you earn 10% on every project you bring in. There''s no ceiling on what you can earn, and no cap on how many leads you can generate. You''ll be representing a credible, DPIIT-recognised software company (DIPP247112) with a real portfolio and genuine client results to show.\n\n**What you''ll be doing:**\nIdentifying businesses that need websites, mobile apps, AI automation, custom software, or digital marketing — and introducing them to QivaLabs. You''ll handle initial outreach and relationship-building; our technical team handles everything from scoping through delivery.\n\n**The commission structure:**\n10% of the project value, paid within 7 days of client payment receipt. On a ₹2 lakh project, that''s ₹20,000. On a ₹10 lakh project, that''s ₹1,00,000. No fixed salary, no floor — this is purely performance-based.\n\n**Who this is for:**\nSomeone with an existing network of business owners, a background in sales or marketing, or genuine hustle and the ability to start conversations. Prior technology sales experience is helpful but not required — we''ll train you on our services and provide sales materials.\n\nThis role suits people who want flexibility, who are confident communicators, and who want to earn meaningfully based on their output.',
  ARRAY[
    'Strong communication skills in Hindi and English',
    'Ability to identify and reach business owners and decision-makers',
    'Self-motivated — this role rewards those who create their own pipeline',
    'Basic understanding of what software, websites, and digital marketing do (we will train you on our specific services)',
    'WhatsApp and LinkedIn proficiency for outreach',
    'Based in Udaipur, Rajasthan preferred (remote work possible for candidates with strong networks elsewhere)'
  ],
  TRUE
);

-- ─── Updated_at triggers ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_job_listings_updated_at
  BEFORE UPDATE ON job_listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON portfolio_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
