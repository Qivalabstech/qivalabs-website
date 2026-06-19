/**
 * QivaLabs Lead Capture API
 *
 * Deploy this /server folder to Render as a web service.
 * Set LEADS_WEBHOOK_URL env var to forward leads to n8n / Zapier / Make / any webhook.
 * Set ALLOWED_ORIGIN to your Vercel production URL (e.g. https://qivalabs.com).
 *
 * Start: node index.js
 * Port:  process.env.PORT (Render sets this automatically) or 3001
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://qivalabs.com';

// ─── CORS ───────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [ALLOWED_ORIGIN, 'http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// ─── Storage ─────────────────────────────────────────────────────────────────
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function appendLead(filename, lead) {
  const filePath = path.join(DATA_DIR, filename);
  let records = [];
  if (fs.existsSync(filePath)) {
    try { records = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch {}
  }
  records.push(lead);
  fs.writeFileSync(filePath, JSON.stringify(records, null, 2));
}

async function forwardToWebhook(payload) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) return;
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('[webhook] Forward failed:', err.message);
  }
}

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'QivaLabs API', ts: new Date().toISOString() });
});

// ─── POST /api/leads/mandi ────────────────────────────────────────────────────
app.post('/api/leads/mandi', async (req, res) => {
  const { businessName, ownerName, whatsapp, city, monthlyVolume, painPoint } = req.body;

  if (!businessName?.trim() || !ownerName?.trim() || !whatsapp?.trim()) {
    return res.status(400).json({ error: 'businessName, ownerName, and whatsapp are required.' });
  }

  const lead = {
    type: 'mandi-enrollment',
    businessName: businessName.trim(),
    ownerName: ownerName.trim(),
    whatsapp: whatsapp.trim(),
    city: city?.trim() ?? '',
    monthlyVolume: monthlyVolume ?? '',
    painPoint: painPoint?.trim() ?? '',
    receivedAt: new Date().toISOString(),
  };

  console.log('[/api/leads/mandi] New enrollment:', lead);
  appendLead('mandi-leads.json', lead);
  await forwardToWebhook(lead);

  res.json({ success: true, message: "Enrolled! We'll contact you within 1 hour." });
});

// ─── POST /api/leads/crm ─────────────────────────────────────────────────────
app.post('/api/leads/crm', async (req, res) => {
  const { companyName, contactPerson, email, currentCRM, teamSize, automationGoal } = req.body;

  if (!companyName?.trim() || !contactPerson?.trim() || !email?.trim()) {
    return res.status(400).json({ error: 'companyName, contactPerson, and email are required.' });
  }

  const lead = {
    type: 'crm-onboarding',
    companyName: companyName.trim(),
    contactPerson: contactPerson.trim(),
    email: email.trim(),
    currentCRM: currentCRM?.trim() ?? '',
    teamSize: teamSize ?? '',
    automationGoal: automationGoal?.trim() ?? '',
    receivedAt: new Date().toISOString(),
  };

  console.log('[/api/leads/crm] New CRM onboarding:', lead);
  appendLead('crm-leads.json', lead);
  await forwardToWebhook(lead);

  res.json({ success: true, message: "Received! We'll be in touch within 24 hours." });
});

// ─── POST /api/contact ────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, business, email, phone, message } = req.body;

  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: 'name and phone are required.' });
  }

  const contact = {
    type: 'contact-form',
    name: name.trim(),
    business: business?.trim() ?? '',
    email: email?.trim() ?? '',
    phone: phone.trim(),
    message: message?.trim() ?? '',
    receivedAt: new Date().toISOString(),
  };

  console.log('[/api/contact] New contact form submission:', contact);
  appendLead('contact-submissions.json', contact);
  await forwardToWebhook(contact);

  res.json({ success: true, message: 'Message received. Thank you!' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`QivaLabs API server running on port ${PORT}`);
  console.log(`CORS origin: ${ALLOWED_ORIGIN}`);
  console.log(`Webhook: ${process.env.LEADS_WEBHOOK_URL ? 'configured' : 'not configured (leads saved to data/*.json)'}`);
});
