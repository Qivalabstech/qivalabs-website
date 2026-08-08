-- QivaLabs Admin — Additional Schema
-- Run this AFTER supabase-schema.sql (that one creates contact_submissions,
-- job_listings, job_applications, portfolio_items — none of which exist yet
-- on a freshly (re)created project). Run both files, in order, in the
-- Supabase SQL Editor.

-- ─── Admin Users (domain-restricted email + password login) ───────────
CREATE TABLE IF NOT EXISTS admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL DEFAULT '',
  role          TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'bda', 'viewer')),
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── CRM: Customers ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS crm_customers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  company     TEXT NOT NULL DEFAULT '',
  email       TEXT NOT NULL DEFAULT '',
  phone       TEXT NOT NULL DEFAULT '',
  source      TEXT NOT NULL DEFAULT 'website' CHECK (source IN ('website', 'referral', 'bda', 'cold-outreach', 'other')),
  notes       TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_crm_customers_created_at ON crm_customers (created_at DESC);

-- ─── CRM: Projects ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS crm_projects (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id   UUID REFERENCES crm_customers (id) ON DELETE SET NULL,
  project_name  TEXT NOT NULL,
  service_type  TEXT NOT NULL DEFAULT '',
  status        TEXT NOT NULL DEFAULT 'inquiry' CHECK (status IN ('inquiry', 'proposal_sent', 'in_progress', 'on_hold', 'completed', 'cancelled')),
  value         NUMERIC(12, 2) NOT NULL DEFAULT 0,
  start_date    DATE,
  due_date      DATE,
  notes         TEXT NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_crm_projects_customer_id ON crm_projects (customer_id);
CREATE INDEX idx_crm_projects_status ON crm_projects (status);

-- ─── BDA Deals & Commission Tracking (10% default, matches the real
-- Business Development Associate role terms) ───────────────────────────
CREATE TABLE IF NOT EXISTS bda_deals (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bda_name            TEXT NOT NULL,
  bda_email           TEXT NOT NULL DEFAULT '',
  company_name        TEXT NOT NULL,
  project_id          UUID REFERENCES crm_projects (id) ON DELETE SET NULL,
  deal_value          NUMERIC(12, 2) NOT NULL DEFAULT 0,
  commission_percent  NUMERIC(5, 2) NOT NULL DEFAULT 10,
  commission_amount   NUMERIC(12, 2) GENERATED ALWAYS AS (deal_value * commission_percent / 100) STORED,
  status              TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed_won', 'closed_lost')),
  commission_paid     BOOLEAN NOT NULL DEFAULT FALSE,
  closed_date         DATE,
  notes               TEXT NOT NULL DEFAULT '',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bda_deals_status ON bda_deals (status);
CREATE INDEX idx_bda_deals_bda_email ON bda_deals (bda_email);

-- ─── updated_at triggers (reuses the function from supabase-schema.sql,
-- dropped first so this script is safe to re-run) ───────────────────────
DROP TRIGGER IF EXISTS update_crm_customers_updated_at ON crm_customers;
CREATE TRIGGER update_crm_customers_updated_at
  BEFORE UPDATE ON crm_customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_crm_projects_updated_at ON crm_projects;
CREATE TRIGGER update_crm_projects_updated_at
  BEFORE UPDATE ON crm_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bda_deals_updated_at ON bda_deals;
CREATE TRIGGER update_bda_deals_updated_at
  BEFORE UPDATE ON bda_deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── Integration tokens (AdSense OAuth refresh token, etc.) ───────────
-- Single-row-per-integration key/value store. The refresh token is the
-- only long-lived secret; it's written by the OAuth callback and read
-- server-side only (service_role key), never exposed to the browser.
CREATE TABLE IF NOT EXISTS integration_tokens (
  name          TEXT PRIMARY KEY,
  refresh_token TEXT NOT NULL,
  connected_by  TEXT NOT NULL DEFAULT '',
  connected_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE integration_tokens ENABLE ROW LEVEL SECURITY;

-- Note: no ALTER PUBLICATION here. The admin app's "live" inquiries feed
-- polls a protected API route every 8s rather than using a browser-side
-- Supabase Realtime subscription (that would need the anon key exposed to
-- the browser plus RLS policies loosened for it, neither of which fits
-- cleanly with a custom-auth internal tool). Polling keeps every table
-- readable only by the server-side service_role key.

-- ─── Row Level Security: lock every table down by default. The admin
-- app only ever talks to Supabase using the service_role key server-side
-- (which bypasses RLS), so enabling RLS with zero public policies means
-- the anon/public key literally cannot read or write any of this data,
-- even if it were ever exposed. ───────────────────────────────────────
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE bda_deals ENABLE ROW LEVEL SECURITY;
