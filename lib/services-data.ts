export type ServiceCategory =
  | 'Digital & Marketing'
  | 'Software Development'
  | 'IT Infrastructure'
  | 'AI & Automation'
  | 'Support & Consulting';

export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  problemStatement: string;
  solutionStatement: string;
  bodyContent: string;
  includes: string[];
  relatedSlugs: string[];
}

export const SERVICES: ServiceData[] = [
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortTitle: 'Digital Marketing',
    category: 'Digital & Marketing',
    icon: '📣',
    metaTitle: 'Digital Marketing Services in Udaipur, India | QivaLabs',
    metaDescription:
      'Result-driven digital marketing services in Udaipur — SEO, paid ads, social media, content marketing, and lead generation. QivaLabs helps businesses grow their online presence across India.',
    h1: 'Digital Marketing Services in Udaipur',
    tagline: 'Turn your online presence into a predictable growth engine.',
    problemStatement:
      'Most businesses in Udaipur invest in a website but see little return — no traffic, no leads, no conversions. Without a structured digital marketing strategy, even great products stay invisible online.',
    solutionStatement:
      'QivaLabs builds performance-first digital marketing programs: from SEO that ranks you on Google, to paid campaigns that generate quality leads, to social content that builds brand authority — all tied to measurable business outcomes.',
    bodyContent: `In today's market, your digital presence is your storefront. Customers in Udaipur, Rajasthan, and across India search online before they buy, compare, or contact a vendor. If your business isn't appearing in those moments, your competitors are winning the conversation.

QivaLabs takes a data-driven approach to digital marketing. We start by understanding your target audience, their search behaviour, and the competitive landscape in your niche. We then build a multi-channel strategy that includes organic search optimisation, targeted paid advertising on Google and Meta platforms, content marketing, and social media management.

Our campaigns are tracked obsessively. Every rupee of ad spend is accountable to a conversion metric — whether that's form submissions, calls, purchases, or qualified leads. We provide monthly reporting with actionable insights, not vanity metrics.

For local businesses in Udaipur and Rajasthan, we specialise in local SEO tactics that help you appear in Google Maps, local search packs, and geo-targeted queries. For B2B clients, we design LinkedIn and content strategies that position you as an authority and shorten your sales cycle.

Whether you're a startup launching your first campaign or an established business looking to scale, QivaLabs can build a digital marketing engine that delivers consistent, compounding results over time.`,
    includes: [
      'Search Engine Optimisation (SEO) — technical, on-page, and off-page',
      'Google Ads (Search, Display, YouTube) campaign management',
      'Meta Ads (Facebook & Instagram) paid campaigns',
      'Content marketing & blog strategy',
      'Social media management (LinkedIn, Instagram, Facebook)',
      'Local SEO & Google Business Profile optimisation',
      'Email marketing campaigns',
      'Analytics setup, tracking, and monthly reporting',
    ],
    relatedSlugs: ['seo-performance-optimization', 'branding-identity', 'website-design-development', 'ui-ux-design'],
  },
  {
    slug: 'branding-identity',
    title: 'Branding & Identity',
    shortTitle: 'Branding & Identity',
    category: 'Digital & Marketing',
    icon: '🎨',
    metaTitle: 'Branding & Identity Design Services Udaipur | QivaLabs',
    metaDescription:
      'Professional branding and identity design in Udaipur — logo design, brand guidelines, visual identity systems, and brand strategy. QivaLabs creates brands that resonate.',
    h1: 'Branding & Identity Design Services',
    tagline: 'Build a brand identity that makes you instantly recognisable.',
    problemStatement:
      'Inconsistent visuals, a generic logo, or a misaligned brand message can silently undermine your credibility — even when your product or service is excellent. Customers make snap judgments, and your brand is their first impression.',
    solutionStatement:
      'QivaLabs creates cohesive brand identities — from strategy and naming through to logo design, colour systems, typography, and comprehensive brand guidelines — so your business communicates confidence and consistency across every touchpoint.',
    bodyContent: `Your brand is the sum total of how people experience your business. A strong brand creates trust before the first conversation, justifies premium pricing, and turns customers into advocates. A weak brand, however well-intentioned, creates confusion and commoditises your offering.

At QivaLabs, branding begins with discovery. We research your market, your competitors, and most importantly, your target customers in Udaipur and across India. We map out the brand territory you want to own — the unique position that sets you apart. This strategic foundation informs every visual decision.

The visual identity system we create includes a primary logo and its usage variants, a carefully considered colour palette with defined usage rules, typography that communicates your personality, and supporting graphic elements that create a consistent visual language. Everything is delivered with documentation in a brand style guide that your team and vendors can follow.

Beyond visuals, we help with brand voice and tone — the way you write emails, social posts, proposals, and marketing copy — so your brand communicates consistently whether in a formal pitch deck or an Instagram caption.

Whether you're launching a new business, rebranding after a pivot, or cleaning up an inconsistent visual identity, QivaLabs approaches branding as a strategic investment, not just a design project.`,
    includes: [
      'Brand strategy & positioning workshop',
      'Logo design (primary, secondary, icon variants)',
      'Brand colour palette with usage rules',
      'Typography system selection and pairing',
      'Brand style guide & guidelines document',
      'Business card, letterhead & stationery design',
      'Social media profile & cover templates',
      'Brand voice & tone guidelines',
    ],
    relatedSlugs: ['digital-marketing', 'ui-ux-design', 'website-design-development', 'seo-performance-optimization'],
  },
  {
    slug: 'website-design-development',
    title: 'Website Design & Development',
    shortTitle: 'Website Design',
    category: 'Digital & Marketing',
    icon: '🌐',
    metaTitle: 'Website Design & Development in Udaipur, India | QivaLabs',
    metaDescription:
      'Professional website design and development in Udaipur — custom websites, landing pages, corporate sites, and CMS-based solutions. Fast, responsive, and built to convert. QivaLabs.',
    h1: 'Website Design & Development in Udaipur',
    tagline: 'Websites that look great, load fast, and convert visitors into clients.',
    problemStatement:
      'An outdated or poorly designed website loses you business every day. Slow load times, poor mobile experience, and unclear messaging send visitors away before they learn what you offer.',
    solutionStatement:
      'QivaLabs designs and builds modern, conversion-focused websites — built with clean code, optimised for speed and mobile, and designed to guide visitors toward taking action with your business.',
    bodyContent: `Your website is your most important marketing asset. For most businesses, it\'s the first place a potential customer goes after they hear your name — and what they find in those first 3 seconds determines whether they stay or leave.

QivaLabs builds websites that work: visually compelling, mobile-first, technically sound, and focused on converting visitors into leads or customers. We work with businesses across Udaipur, Rajasthan, and throughout India, from local service providers to multi-city enterprises.

Our process starts with understanding your business goals and your audience. Who are your visitors? What action do you want them to take? What messages are most important to communicate? These insights guide the information architecture, content strategy, and design direction before a single pixel is drawn.

We build on modern, maintainable technologies — Next.js, React, and headless CMS platforms — that deliver exceptional performance scores and are easy for your team to manage. Every site is built with technical SEO fundamentals built in: proper heading hierarchy, structured data, optimised images, and fast load times.

For businesses needing to manage their own content, we integrate content management systems that are intuitive and require no developer knowledge. We also build high-converting landing pages for campaigns, multi-location business sites, and professional portfolio sites.

Post-launch, we offer maintenance and support services to keep your site secure, updated, and performing.`,
    includes: [
      'Custom website design (mobile-first, responsive)',
      'Development on Next.js, React, or WordPress/Webflow',
      'CMS integration for easy content management',
      'Landing page & lead capture page design',
      'Contact forms & lead flow setup',
      'Technical SEO setup (meta tags, schema, sitemap)',
      'Page speed optimisation (Core Web Vitals)',
      'Hosting setup & deployment (Vercel/Netlify/cPanel)',
    ],
    relatedSlugs: ['ecommerce-solutions', 'ui-ux-design', 'seo-performance-optimization', 'hosting-domain-management'],
  },
  {
    slug: 'ecommerce-solutions',
    title: 'E-commerce Solutions',
    shortTitle: 'E-commerce',
    category: 'Digital & Marketing',
    icon: '🛒',
    metaTitle: 'E-commerce Development Services in Udaipur, India | QivaLabs',
    metaDescription:
      'Custom e-commerce website development in Udaipur — Shopify, WooCommerce, and custom-built online stores with payment integration, inventory management, and mobile-first design.',
    h1: 'E-commerce Solutions for Indian Businesses',
    tagline: 'Sell online with a store built for conversions and scale.',
    problemStatement:
      'Generic e-commerce templates handle basic selling but fall apart when your product catalogue grows, your payment needs become specific to India, or your customer journey needs customisation.',
    solutionStatement:
      'QivaLabs builds e-commerce solutions tailored to your business — whether you need a polished Shopify store, a WooCommerce site with custom extensions, or a fully bespoke platform with your own logic and integrations.',
    bodyContent: `E-commerce in India is growing rapidly, and businesses that get their online store right now are building a significant competitive advantage. But a great online store is more than a product listing and a checkout button — it's a carefully designed experience that builds trust, reduces friction, and compels action at every step.

QivaLabs has built e-commerce solutions for fashion brands, electronics retailers, food businesses, B2B suppliers, and artisanal product makers across Udaipur and India. We understand the specific considerations of the Indian market: local payment preferences, UPI and net banking integration, GST-compliant billing, Hindi/English multilingual catalogues, and cash-on-delivery logistics.

We design stores that perform well on mobile devices — where over 70% of Indian e-commerce traffic originates. Product pages are built to convert: clear photography guidelines, concise specifications, prominent CTAs, trust signals, and seamless add-to-cart flows.

Beyond the frontend, we build the backend infrastructure that scales: inventory management, order management systems, shipping API integrations (Shiprocket, Delhivery, custom), customer accounts, wishlists, discount engines, and analytics.

For brands ready to grow, we build the marketing integrations too: email capture, abandoned cart recovery, product review systems, loyalty programmes, and analytics dashboards that give you full visibility into your store\'s performance.`,
    includes: [
      'Custom storefront design (mobile-first)',
      'Shopify, WooCommerce, or headless e-commerce build',
      'Product catalogue setup & category management',
      'Payment gateway integration (Razorpay, PayU, Stripe, UPI)',
      'GST-compliant invoicing & tax configuration',
      'Shipping integration (Shiprocket, Delhivery, custom)',
      'Order management & inventory tracking',
      'Abandoned cart recovery & email automation',
    ],
    relatedSlugs: ['website-design-development', 'payment-gateway-integration', 'digital-marketing', 'custom-software-development'],
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    shortTitle: 'Custom Software',
    category: 'Software Development',
    icon: '⚙️',
    metaTitle: 'Custom Software Development Company Udaipur, India | QivaLabs',
    metaDescription:
      'Custom software development services in Udaipur and across India. QivaLabs builds bespoke business applications, internal tools, automation platforms, and enterprise software tailored to your workflows.',
    h1: 'Custom Software Development in Udaipur',
    tagline: 'Software built for your exact workflows, not the other way around.',
    problemStatement:
      'Off-the-shelf software forces your business to adapt its processes to what a generic product supports. You pay for features you don\'t need and live without the ones you do.',
    solutionStatement:
      'QivaLabs designs and builds custom software from the ground up — applications that fit your exact workflows, integrate with your existing tools, and scale as your operations grow.',
    bodyContent: `Custom software is an investment, not a cost. When your business has outgrown generic tools or needs capabilities that no packaged product offers, purpose-built software becomes the most efficient and scalable solution.

QivaLabs has built custom software solutions for businesses in manufacturing, distribution, finance, healthcare, education, logistics, and retail across Udaipur, Rajasthan, and other parts of India. Each project begins with a deep discovery phase where we map your business processes, identify pain points, and define the exact requirements of the solution.

Our development approach is iterative. We build in phases, starting with the core workflows that deliver the most value, then expanding capabilities based on user feedback. This keeps projects on-budget and ensures you're using working software early in the process rather than waiting for a big-bang delivery.

We work with modern technology stacks — React/Next.js for web frontends, Node.js/Python for backends, PostgreSQL/MySQL for databases, and cloud infrastructure on AWS or Google Cloud — chosen for long-term maintainability rather than fashionable trends.

Custom software we have built includes internal operations management platforms, commission and billing calculation engines, customer-facing self-service portals, inventory and supply chain management tools, and workflow approval systems. Every project is delivered with complete documentation and a knowledge transfer to your team.`,
    includes: [
      'Requirements discovery & process mapping',
      'System architecture & technical design',
      'Iterative development (frontend + backend)',
      'Database design & optimisation',
      'API design & third-party integrations',
      'User acceptance testing (UAT)',
      'Deployment & go-live support',
      'Documentation & team handover',
    ],
    relatedSlugs: ['enterprise-web-applications', 'api-development-integration', 'business-automation', 'saas-product-development'],
  },
  {
    slug: 'business-automation',
    title: 'Business Automation',
    shortTitle: 'Business Automation',
    category: 'AI & Automation',
    icon: '🤖',
    metaTitle: 'Business Automation Services in Udaipur, India | QivaLabs',
    metaDescription:
      'Automate repetitive business processes in Udaipur — workflow automation, task automation, RPA, and system integrations. QivaLabs helps businesses cut operational costs and improve efficiency.',
    h1: 'Business Automation Services in Udaipur',
    tagline: 'Replace manual, repetitive work with reliable automated workflows.',
    problemStatement:
      'When your team spends hours each day on data entry, report generation, follow-up emails, and manual approvals, you\'re paying human talent for work that software can do faster and without errors.',
    solutionStatement:
      'QivaLabs identifies your highest-cost manual processes and builds automation systems — using RPA, workflow tools, custom scripts, and API integrations — that run these processes reliably without human intervention.',
    bodyContent: `Business automation is the most direct path to operational leverage: doing more with the same team, at higher quality, with fewer errors.

QivaLabs works with businesses across Udaipur and India to identify the processes that are costing the most time relative to their value. Common candidates include: invoice processing and data entry, sales follow-up sequences, inventory reorder alerts, report generation and distribution, employee onboarding tasks, and document routing for approvals.

We use a pragmatic toolset — a combination of robotic process automation (RPA) tools, no-code platforms like Make (Integromat) and Zapier for integrations, custom Python or Node.js scripts for complex logic, and webhook-based event systems — chosen based on what is most reliable and maintainable for your specific process.

For businesses with legacy systems that lack APIs, we use UI-level automation to bridge gaps. For cloud-based tools, we build API-to-API integrations. For hybrid environments, we design middleware systems that translate between your different platforms.

Every automation project includes monitoring and alerting: if an automated process fails, your team is notified immediately so the issue can be resolved before it has downstream impact.

The ROI on automation is typically very fast — hours saved per employee per day multiply across months and years into significant cost savings and productivity gains.`,
    includes: [
      'Process audit & automation opportunity mapping',
      'RPA (Robotic Process Automation) implementation',
      'Workflow automation (Make, Zapier, custom)',
      'Automated reporting & dashboard delivery',
      'Email & notification automation',
      'Document generation automation',
      'Approval workflow systems',
      'Monitoring & error alerting for automations',
    ],
    relatedSlugs: ['ai-integrated-automation', 'business-process-automation', 'api-development-integration', 'custom-software-development'],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    category: 'Software Development',
    icon: '📱',
    metaTitle: 'Mobile App Development Company in Udaipur, India | QivaLabs',
    metaDescription:
      'Professional mobile app development in Udaipur — iOS and Android apps, React Native cross-platform apps, and Flutter apps. QivaLabs builds mobile products that users love.',
    h1: 'Mobile App Development in Udaipur, India',
    tagline: 'Build mobile experiences your users will actually use — and recommend.',
    problemStatement:
      'A poorly built mobile app is worse than no app: it frustrates users, damages your brand, and wastes development budget. Many businesses launch apps only to see them abandoned within weeks.',
    solutionStatement:
      'QivaLabs builds mobile applications — for iOS, Android, or both — with a rigorous focus on user experience, performance, and the features that actually drive engagement and retention.',
    bodyContent: `Mobile is no longer optional. Whether your customers are ordering food, booking services, tracking deliveries, accessing their accounts, or communicating with support — they expect a mobile experience that feels native, fast, and intuitive.

QivaLabs builds mobile applications across the full spectrum of complexity: simple utility apps for internal use, customer-facing apps for B2C businesses, field service apps for sales and operations teams, and complex multi-sided marketplace applications.

We develop using React Native for cross-platform projects (a single codebase for both iOS and Android) and Flutter for applications that require pixel-perfect native UX. For businesses that need platform-specific features or performance, we also build native Swift (iOS) and Kotlin (Android) applications.

Our mobile app development process is grounded in UX research. Before writing code, we prototype the key user flows and validate them — because changing direction after development begins is expensive and demoralising for everyone. We use Figma to design high-fidelity prototypes that stakeholders can interact with and provide feedback on before development starts.

We handle app store submission — navigating the specific requirements and review processes of both the Apple App Store and Google Play Store. Post-launch, we provide crash monitoring, analytics integration, and ongoing update maintenance.

From a technical standpoint, we build secure, scalable backends for mobile apps using REST or GraphQL APIs, with proper authentication, push notification infrastructure, and analytics instrumentation built in.`,
    includes: [
      'iOS and/or Android app development',
      'React Native or Flutter cross-platform development',
      'UX wireframing & Figma prototyping',
      'Backend API development for mobile',
      'Push notification system integration',
      'App Store & Google Play submission',
      'Crash reporting & analytics (Firebase, Sentry)',
      'Post-launch maintenance & update releases',
    ],
    relatedSlugs: ['custom-software-development', 'ui-ux-design', 'api-development-integration', 'quality-assurance-testing'],
  },
  {
    slug: 'enterprise-web-applications',
    title: 'Enterprise Web Applications',
    shortTitle: 'Enterprise Apps',
    category: 'Software Development',
    icon: '🏢',
    metaTitle: 'Enterprise Web Application Development Udaipur India | QivaLabs',
    metaDescription:
      'Enterprise web application development in Udaipur — scalable, secure, and robust web platforms for large teams and complex workflows. QivaLabs builds enterprise-grade solutions.',
    h1: 'Enterprise Web Application Development',
    tagline: 'Scalable web platforms built for complex organisations and demanding workloads.',
    problemStatement:
      'Enterprise operations generate complex requirements: multi-role access control, high user concurrency, integration with legacy systems, audit trails, and performance under load. Standard web applications aren\'t built for this.',
    solutionStatement:
      'QivaLabs architects and builds enterprise-grade web applications with the security, scalability, and reliability that large organisations require — designed to grow with your business over years.',
    bodyContent: `Enterprise web applications are the backbone of modern organisations. They power operations, connect teams, and surface the data that drives decisions. Getting them right requires more than code — it requires careful architecture, security discipline, and long-term thinking.

QivaLabs has experience building enterprise-level web platforms for businesses in sectors including manufacturing, financial services, logistics, healthcare administration, and professional services. Our team understands the enterprise concerns that go beyond features: high availability, data security, regulatory compliance, performance at scale, and the ability for new developers to maintain the system over years.

Architecture is the starting point. Before writing code, we design the system architecture: how data flows between services, where the boundaries between components sit, what the scaling strategy looks like, how authentication and authorisation are implemented, and what the disaster recovery approach will be. These decisions, made early, prevent costly refactors later.

We build on battle-tested technologies — Next.js, Node.js, PostgreSQL, Redis — with infrastructure on AWS or Google Cloud managed through Terraform. We implement CI/CD pipelines that allow safe, frequent deployments, automated testing at multiple levels, and easy rollback when issues are detected.

Security is non-negotiable in enterprise projects. We implement role-based access control with granular permissions, end-to-end encryption for sensitive data, comprehensive audit logging, and regular security reviews as part of the development process.`,
    includes: [
      'System architecture design & technical specification',
      'Multi-role RBAC (Role-Based Access Control)',
      'High-availability infrastructure setup',
      'Real-time features (WebSockets, live dashboards)',
      'Audit logging & compliance reporting',
      'SSO & enterprise authentication (SAML, OAuth)',
      'Performance optimisation & load testing',
      'CI/CD pipeline & automated test suites',
    ],
    relatedSlugs: ['custom-software-development', 'crm-erp-solutions', 'cloud-solutions-migration', 'devops-infrastructure'],
  },
  {
    slug: 'crm-erp-solutions',
    title: 'CRM & ERP Solutions',
    shortTitle: 'CRM & ERP',
    category: 'Software Development',
    icon: '📊',
    metaTitle: 'CRM & ERP Solutions in Udaipur, India | QivaLabs',
    metaDescription:
      'CRM and ERP implementation, customisation, and development in Udaipur. QivaLabs implements Zoho, custom CRM builds, and ERP solutions for SMEs and growing businesses across India.',
    h1: 'CRM & ERP Solutions for Growing Businesses',
    tagline: 'Unify your sales, operations, and data in a single system that grows with you.',
    problemStatement:
      'Disconnected tools for sales, inventory, billing, and customer management create data silos, manual reconciliation work, and poor visibility into your business. Teams waste hours moving data between systems.',
    solutionStatement:
      'QivaLabs implements and customises CRM and ERP systems — Zoho, custom builds, or hybrid solutions — that connect your business functions and give you real-time visibility into every aspect of operations.',
    bodyContent: `For businesses reaching a certain scale, the question of CRM and ERP becomes existential: without a unified system, growth creates chaos rather than leverage. Sales data lives in one place, inventory in another, billing in a third, and no one has a clear picture of what's actually happening in the business.

QivaLabs works with SMEs and mid-market companies across Udaipur and India to select, implement, customise, and integrate CRM and ERP systems. We start with a business process mapping exercise — documenting how leads are captured, how orders flow, how inventory is managed, how invoices are generated, and how performance is measured — before recommending a technical path forward.

For many clients, Zoho CRM and Zoho One provide an excellent foundation: a comprehensive suite of integrated applications (CRM, Books, Inventory, Projects, Desk) that can be configured and customised without extensive custom development. We have deep expertise in Zoho implementation and customisation, including custom modules, automation workflows, and API integrations with third-party tools.

For businesses with highly specific workflows or an existing technical ecosystem, we build custom CRM and ERP modules using our own software development capabilities. This is particularly relevant for industry-specific processes that generic CRM products don\'t support well.

Regardless of the platform, we handle data migration from legacy systems, train your team, and provide ongoing support as your usage of the system evolves.`,
    includes: [
      'Business process discovery & system selection',
      'Zoho CRM / Zoho One implementation & configuration',
      'Custom CRM or ERP module development',
      'Sales pipeline & lead management setup',
      'Inventory & order management configuration',
      'Billing, invoicing & financial module setup',
      'Data migration from existing systems',
      'Team training & ongoing support',
    ],
    relatedSlugs: ['custom-software-development', 'business-automation', 'api-development-integration', 'ai-integrated-automation'],
  },
  {
    slug: 'loan-origination-software',
    title: 'Loan Origination Software (LOS)',
    shortTitle: 'Loan Origination',
    category: 'Software Development',
    icon: '🏦',
    metaTitle: 'Loan Origination Software (LOS) Development India | QivaLabs',
    metaDescription:
      'Custom Loan Origination Software (LOS) development for NBFCs, microfinance, and digital lenders in India. QivaLabs builds end-to-end digital credit lifecycle platforms.',
    h1: 'Loan Origination Software Development',
    tagline: 'Digitise and accelerate your entire credit lifecycle — from application to disbursement.',
    problemStatement:
      'Manual loan processing is slow, error-prone, and operationally expensive. For NBFCs, MFIs, and digital lenders, paper-based or fragmented digital processes create compliance risk and limit disbursement volume.',
    solutionStatement:
      'QivaLabs builds custom Loan Origination Software (LOS) that digitises the full credit lifecycle — application capture, KYC verification, credit scoring, approval workflows, documentation, and disbursement — on a single platform.',
    bodyContent: `The lending industry in India is undergoing rapid digital transformation, driven by RBI\'s digital lending guidelines, growing MSME credit demand, and the emergence of fintech-first NBFCs. Organisations that lag in digital lending infrastructure are losing market share to more agile competitors.

QivaLabs has built LOS platforms for NBFCs and microfinance organisations, designing systems that are compliant with applicable RBI regulations while being fast and intuitive for both loan officers and borrowers.

A well-designed LOS covers multiple stages of the credit lifecycle: digital application capture via web and mobile, automated KYC verification via Aadhaar, PAN, and bureau integrations, configurable credit scoring models that can incorporate bureau data (CIBIL, Experian) and alternate data, multi-level approval workflows with delegation rules, automated document generation for sanction letters and loan agreements with e-sign integration, disbursement initiation to bank accounts via NEFT/IMPS, and EMI schedule generation and collection tracking.

We build with security and auditability at the forefront — every action in the system is logged, data is encrypted at rest and in transit, and the platform maintains a complete audit trail for regulatory examination. Role-based access control ensures that loan officers, credit analysts, branch managers, and compliance officers each see exactly what they need and nothing more.

LOS platforms we build are designed to handle high volumes and integrate with existing CBS (Core Banking Systems) through well-defined APIs.`,
    includes: [
      'Digital loan application portal (web & mobile)',
      'KYC integration (Aadhaar, PAN, DigiLocker)',
      'Credit bureau integration (CIBIL, Experian, CRIF)',
      'Configurable credit scoring & decisioning engine',
      'Multi-level approval workflow management',
      'Document generation & e-sign integration',
      'Disbursement management & bank API integration',
      'EMI schedule, collection tracking & overdue management',
    ],
    relatedSlugs: ['custom-software-development', 'enterprise-web-applications', 'api-development-integration', 'payment-gateway-integration'],
  },
  {
    slug: 'ai-integrated-automation',
    title: 'AI-Integrated Automation',
    shortTitle: 'AI Automation',
    category: 'AI & Automation',
    icon: '🧠',
    metaTitle: 'AI-Integrated Automation Services in Udaipur, India | QivaLabs',
    metaDescription:
      'AI integration and automation services in Udaipur — LLM-powered workflows, AI chatbots, document processing automation, and intelligent business systems. QivaLabs brings practical AI to your operations.',
    h1: 'AI-Integrated Automation Services',
    tagline: 'Integrate practical AI into your business operations — not just demos.',
    problemStatement:
      'The AI landscape is overwhelming: too many tools, too much hype, and too little clarity on what will actually deliver ROI for a specific business. Most AI pilots fail to reach production because they\'re not connected to real workflows.',
    solutionStatement:
      'QivaLabs identifies the highest-impact AI integration opportunities in your business and builds production-ready automation systems using LLMs, classification models, and intelligent agents connected directly to your existing software and data.',
    bodyContent: `AI is genuinely transforming business operations — but the value comes from specific, well-scoped integrations, not from deploying AI broadly and hoping for the best.

QivaLabs takes a pragmatic approach to AI: we start by identifying the specific processes in your business where AI can meaningfully reduce cost, improve speed, or increase quality. Common high-value applications include intelligent document processing (extracting structured data from invoices, contracts, and applications), AI-powered customer support triage (routing and drafting responses), automated content generation for product descriptions or marketing copy, AI-assisted data analysis and reporting, and conversational AI for internal knowledge management.

We have built AI systems using the major LLM APIs — Claude (Anthropic), GPT-4 (OpenAI), and open-source models — with production-grade infrastructure including proper prompt engineering, output validation, fallback handling, and cost monitoring. We build the surrounding glue code that connects AI capabilities to your existing databases, APIs, and user interfaces.

For businesses with sensitive data, we can architect AI systems that keep data within your control using self-hosted models or Azure OpenAI with data residency guarantees.

We also implement AI orchestration frameworks for multi-step agentic workflows — where AI systems can take sequences of actions to complete complex tasks with minimal human intervention.`,
    includes: [
      'AI opportunity assessment & ROI mapping',
      'LLM integration (Claude, GPT-4, open-source models)',
      'Intelligent document processing & OCR + AI extraction',
      'AI chatbot & conversational agent development',
      'Automated content generation workflows',
      'AI-powered classification & routing systems',
      'Agentic workflow design & implementation',
      'AI cost monitoring & output quality validation',
    ],
    relatedSlugs: ['business-automation', 'business-process-automation', 'custom-software-development', 'crm-erp-solutions'],
  },
  {
    slug: 'business-process-automation',
    title: 'Business Process Automation',
    shortTitle: 'Process Automation',
    category: 'AI & Automation',
    icon: '🔄',
    metaTitle: 'Business Process Automation (BPA) Services Udaipur | QivaLabs',
    metaDescription:
      'Business Process Automation (BPA) services in Udaipur, India. QivaLabs automates end-to-end business workflows — procurement, HR, finance, and operations — to reduce cost and increase throughput.',
    h1: 'Business Process Automation (BPA) Services',
    tagline: 'Automate entire business processes, not just individual tasks.',
    problemStatement:
      'Most businesses automate individual steps in a process while leaving the overall workflow manual, fragmented, and dependent on human coordination. The real cost savings come from automating entire end-to-end processes.',
    solutionStatement:
      'QivaLabs designs and implements end-to-end Business Process Automation — mapping complete workflows from trigger to outcome, then building automated systems that handle the entire sequence with minimal human touchpoints.',
    bodyContent: `There\'s an important distinction between task automation and process automation. Task automation speeds up individual steps. Business Process Automation (BPA) reimagines entire workflows — from the event that triggers a process to the outcome it produces — to eliminate the handoffs, delays, and errors that occur when humans coordinate between steps.

QivaLabs approaches BPA as a process engineering exercise first and a technology exercise second. We begin by documenting your existing process in detail: every step, every decision point, every system used, every person involved. We then identify the non-value-adding steps, the bottlenecks, the failure points, and the automation opportunities.

Common BPA implementations we build include: procurement-to-pay workflows (purchase request → approval → PO generation → vendor confirmation → receipt → payment), hire-to-retire workflows (offer → onboarding checklist → system access provisioning → payroll setup), order-to-cash processes (order receipt → fulfilment → shipping notification → invoice generation → payment reconciliation), and compliance workflows (audit request → evidence collection → review → sign-off → archival).

We implement these workflows using a combination of technologies: integration platforms, custom application logic, robotic process automation for legacy system interaction, and AI components where intelligent decision-making is required.

The result is processes that run faster, more consistently, at lower cost, and with a complete audit trail — giving management full visibility and control.`,
    includes: [
      'As-is process documentation & analysis',
      'To-be process design & optimisation',
      'Workflow automation platform implementation',
      'Cross-system process integration',
      'Approval & escalation logic',
      'Exception handling & human-in-the-loop checkpoints',
      'Process monitoring dashboards & KPI tracking',
      'Change management & team training',
    ],
    relatedSlugs: ['business-automation', 'ai-integrated-automation', 'api-development-integration', 'crm-erp-solutions'],
  },
  {
    slug: 'api-development-integration',
    title: 'API Development & Integration',
    shortTitle: 'API Integration',
    category: 'Software Development',
    icon: '🔌',
    metaTitle: 'API Development & Integration Services Udaipur India | QivaLabs',
    metaDescription:
      'Custom API development and third-party integration services in Udaipur, India. QivaLabs builds REST and GraphQL APIs, connects disparate systems, and creates integration middleware.',
    h1: 'API Development & Integration Services',
    tagline: 'Connect your systems, eliminate data silos, and automate cross-platform workflows.',
    problemStatement:
      'When your business tools don\'t communicate, data has to be entered manually into multiple systems, reports can\'t be generated automatically, and operations stall waiting for information to be transferred by hand.',
    solutionStatement:
      'QivaLabs builds custom APIs and integration middleware that connect your systems — making data flow automatically between platforms and eliminating the manual work of keeping multiple systems in sync.',
    bodyContent: `Modern businesses operate across a stack of software tools — CRMs, ERPs, e-commerce platforms, accounting software, communication tools, logistics systems — and these tools are most powerful when they share data in real time.

QivaLabs has deep expertise in API development and system integration. We build custom REST and GraphQL APIs that expose your business data and functionality to other systems, mobile apps, or partners. We also build integration pipelines that connect third-party services using their existing APIs.

For businesses with legacy systems that lack APIs, we use techniques such as screen scraping, database-level integration, or middleware adapters to create the integration bridge needed. For cloud-based tools, we work with native APIs, webhooks, and OAuth-based authentication to build secure, reliable connections.

Common integration projects we handle include: connecting e-commerce platforms to accounting software (Shopify ↔ Tally/Zoho Books), linking CRMs to communication tools (Zoho ↔ WhatsApp/Twilio), syncing inventory systems with marketplace listings (custom ERP ↔ Flipkart/Amazon), integrating payment gateways with order management systems, and connecting field service apps to back-office databases.

We design integrations with resilience in mind: retry logic for failed operations, dead-letter queues for messages that can\'t be processed, monitoring and alerting for integration health, and detailed logging that makes debugging fast when issues do occur.`,
    includes: [
      'REST & GraphQL API design and development',
      'Third-party API integration (Zoho, Razorpay, WhatsApp, etc.)',
      'Webhook setup & event-driven integration',
      'Integration middleware & data transformation',
      'Authentication & security (OAuth2, API keys, JWT)',
      'API documentation (Swagger/OpenAPI)',
      'Error handling, retry logic & dead-letter queues',
      'Integration monitoring & health dashboards',
    ],
    relatedSlugs: ['custom-software-development', 'business-automation', 'payment-gateway-integration', 'third-party-system-integration'],
  },
  {
    slug: 'cloud-solutions-migration',
    title: 'Cloud Solutions & Migration',
    shortTitle: 'Cloud Solutions',
    category: 'IT Infrastructure',
    icon: '☁️',
    metaTitle: 'Cloud Solutions & Migration Services Udaipur India | QivaLabs',
    metaDescription:
      'Cloud migration and cloud infrastructure services in Udaipur, India. QivaLabs helps businesses move to AWS, Google Cloud, or Azure with a structured migration plan and managed cloud setup.',
    h1: 'Cloud Solutions & Migration Services',
    tagline: 'Move to the cloud strategically — with minimal disruption and maximum benefit.',
    problemStatement:
      'On-premises infrastructure limits scalability, creates single points of failure, and requires expensive hardware maintenance. Businesses stuck on legacy on-prem systems can\'t scale fast enough to meet demand or compete with cloud-native competitors.',
    solutionStatement:
      'QivaLabs plans and executes cloud migrations with a structured approach — assessing your current infrastructure, designing the cloud architecture, migrating workloads with minimal downtime, and managing your cloud environment post-migration.',
    bodyContent: `Cloud infrastructure is no longer a trend — it\'s the operational standard for businesses that want flexibility, reliability, and cost efficiency. AWS, Google Cloud, and Azure offer capabilities that simply aren\'t achievable with on-premises hardware at any reasonable cost, including auto-scaling, global CDN, managed database services, serverless compute, and enterprise-grade security tools.

QivaLabs helps businesses in Udaipur and across India navigate cloud migration systematically. We begin with a cloud readiness assessment: inventorying existing infrastructure, understanding application dependencies, mapping data flows, assessing security requirements, and estimating the cost and timeline of migration.

Based on the assessment, we design the target cloud architecture — choosing the right services, regions, and configurations for your workloads. We use infrastructure-as-code tools (Terraform, AWS CloudFormation) to define the target environment, enabling reliable, repeatable deployments.

Migration execution uses a phased approach to minimise risk. We typically start with non-critical workloads to prove the migration process, refine the approach, and build team familiarity before migrating production systems. For each workload, we run parallel environments and validate thoroughly before cutting over.

Post-migration, we configure cloud cost monitoring to prevent bill surprises, set up auto-scaling policies, implement backup and disaster recovery, and optimise resources based on actual usage patterns. We also provide managed cloud services for businesses that don\'t want to manage their cloud environment internally.`,
    includes: [
      'Cloud readiness assessment & cost modelling',
      'Cloud architecture design (AWS/GCP/Azure)',
      'Infrastructure-as-code setup (Terraform)',
      'Database migration & optimisation',
      'Application containerisation (Docker, Kubernetes)',
      'Phased workload migration with rollback plans',
      'Cloud cost monitoring & right-sizing',
      'Disaster recovery & backup configuration',
    ],
    relatedSlugs: ['devops-infrastructure', 'enterprise-web-applications', 'database-design-management', 'cybersecurity-solutions'],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    shortTitle: 'UI/UX Design',
    category: 'Digital & Marketing',
    icon: '🖌️',
    metaTitle: 'UI/UX Design Services in Udaipur, India | QivaLabs',
    metaDescription:
      'Professional UI/UX design services in Udaipur — user research, wireframing, Figma prototyping, and design systems for web and mobile apps. QivaLabs creates intuitive, beautiful digital interfaces.',
    h1: 'UI/UX Design Services in Udaipur',
    tagline: 'Design digital experiences that are intuitive, beautiful, and conversion-focused.',
    problemStatement:
      'Poor UX is invisible to the team that built it but painfully obvious to users. High bounce rates, low engagement, and user complaints about confusing interfaces are symptoms of design problems that cost revenue.',
    solutionStatement:
      'QivaLabs delivers research-informed UI/UX design — from user research and information architecture through high-fidelity Figma prototypes and design systems that developers can build from confidently.',
    bodyContent: `Good design is not decoration — it\'s the difference between a product people adopt and one they abandon. The best UI/UX design makes complex things feel simple, guides users toward their goals without friction, and creates the kind of experience people recommend to others.

QivaLabs approaches UI/UX design as a discipline grounded in user behaviour and business goals. We start by understanding who the users are and what they\'re trying to accomplish. For new products, this involves user research interviews, competitive analysis, and persona development. For existing products, we conduct usability testing to identify where users are getting confused or frustrated.

With research in hand, we build information architecture — the blueprint for how content and functionality are organised. This is where structure decisions are made that will define the clarity of the entire experience. We test navigation concepts and labelling with representative users before they become permanent.

From there, we move into visual design: wireframes that establish layout and hierarchy, followed by high-fidelity Figma designs that specify every visual detail — colours, typography, spacing, interaction states, empty states, loading states, and error states. Nothing is left to developer interpretation.

For products with multiple screens or complex interaction patterns, we build interactive Figma prototypes that can be tested with users before a single line of code is written. This approach catches expensive design problems early.

We also build design systems — a shared library of components, patterns, and usage guidelines that ensure visual and interaction consistency across the entire product and make future development faster.`,
    includes: [
      'User research & persona development',
      'Information architecture & user flow mapping',
      'Wireframing (low and mid-fidelity)',
      'High-fidelity UI design in Figma',
      'Interactive prototype for user testing',
      'Design system & component library',
      'Responsive design for mobile, tablet, and desktop',
      'Developer handoff with detailed specifications',
    ],
    relatedSlugs: ['website-design-development', 'mobile-app-development', 'branding-identity', 'custom-software-development'],
  },
  {
    slug: 'data-analytics-bi',
    title: 'Data Analytics & Business Intelligence',
    shortTitle: 'Data & Analytics',
    category: 'IT Infrastructure',
    icon: '📈',
    metaTitle: 'Data Analytics & Business Intelligence Services Udaipur | QivaLabs',
    metaDescription:
      'Data analytics and business intelligence services in Udaipur, India — custom BI dashboards, data pipelines, reporting automation, and analytics strategy. QivaLabs turns data into decisions.',
    h1: 'Data Analytics & Business Intelligence Services',
    tagline: 'Transform raw business data into insights that drive better decisions.',
    problemStatement:
      'Most businesses are drowning in data but starved for insights. Spreadsheets, disconnected databases, and manual reports mean that by the time leadership sees a number, it\'s outdated — and no one agrees on which number is correct.',
    solutionStatement:
      'QivaLabs builds data analytics infrastructure and BI dashboards that give you a single source of truth — real-time, accurate, and accessible to the people who need to act on it.',
    bodyContent: `Data-driven decision-making is a competitive advantage, but only if the data is accessible, accurate, and presented in a way that enables action. Most businesses have the data — in their CRMs, ERPs, e-commerce platforms, and databases — but lack the infrastructure to bring it together and surface meaningful insights.

QivaLabs builds end-to-end analytics solutions: from the data pipeline that collects and normalises data from multiple sources, to the data warehouse that stores it in a queryable structure, to the BI dashboards that visualise it for different audiences in your organisation.

We work with modern BI tools — Metabase, Google Looker Studio, Power BI, and custom React-based dashboards — choosing the right tool based on your team\'s technical capability and the complexity of your reporting needs. For most SMEs, we recommend Metabase or Looker Studio: powerful, user-friendly, and affordable.

Data pipelines are built using Python ETL scripts or low-code tools like Airbyte or Fivetran, depending on the scale and complexity of the integration. We handle data from databases, SaaS APIs (Zoho, HubSpot, Shopify), spreadsheets, and flat files.

Key metrics we help businesses track include: sales performance (by product, region, rep), customer acquisition and retention, operational efficiency metrics, financial KPIs (margin, cash flow, receivables), and marketing attribution.

Every analytics project ends with training: we ensure your team knows how to use the dashboards, build new reports, and interpret the data correctly.`,
    includes: [
      'Analytics requirements & KPI workshop',
      'Data source audit & integration planning',
      'ETL pipeline setup (Python, Airbyte, Fivetran)',
      'Data warehouse design (PostgreSQL, BigQuery)',
      'BI dashboard development (Metabase, Looker, Power BI)',
      'Automated report generation & distribution',
      'Data quality monitoring & anomaly alerts',
      'Team training & dashboard documentation',
    ],
    relatedSlugs: ['custom-software-development', 'business-process-automation', 'crm-erp-solutions', 'it-consulting'],
  },
  {
    slug: 'cybersecurity-solutions',
    title: 'Cybersecurity Solutions',
    shortTitle: 'Cybersecurity',
    category: 'IT Infrastructure',
    icon: '🔒',
    metaTitle: 'Cybersecurity Solutions & Services Udaipur India | QivaLabs',
    metaDescription:
      'Cybersecurity services in Udaipur — security audits, vulnerability assessments, penetration testing, and infrastructure hardening. QivaLabs helps businesses protect their digital assets.',
    h1: 'Cybersecurity Solutions for Businesses in India',
    tagline: 'Protect your business before attackers find what you haven\'t.',
    problemStatement:
      'Cyber threats are no longer just a concern for large enterprises. SMEs in India are frequently targeted precisely because they assume they\'re too small to be targeted — and have weaker defences as a result.',
    solutionStatement:
      'QivaLabs conducts comprehensive security assessments, identifies vulnerabilities in your systems and processes, and implements hardening measures that reduce your attack surface and compliance risk.',
    bodyContent: `Cybersecurity incidents are costly in multiple dimensions: financial losses from theft or ransomware, operational disruption during incident response, reputational damage with customers and partners, and regulatory penalties for data breaches involving personal information.

QivaLabs provides practical cybersecurity services designed for the reality of Indian SME budgets and threat environments. We don\'t sell fear — we focus on identifying the specific risks that are most likely and most damaging for your business, and addressing those first.

Our security assessments start with understanding your architecture: web applications, APIs, internal networks, cloud infrastructure, and human processes. We identify the assets most critical to protect — customer data, financial records, intellectual property, operational systems — and assess the controls in place to protect them.

We conduct vulnerability assessments and, where appropriate, penetration testing: ethical hacking exercises that simulate attacker techniques to identify weaknesses before malicious actors do. We follow responsible disclosure practices and work collaboratively with your team throughout the exercise.

Based on assessment findings, we implement security hardening: patching systems, correcting misconfigurations, implementing proper secrets management, setting up web application firewalls, configuring security headers, enabling multi-factor authentication, and establishing secure coding practices for development teams.

For businesses that need compliance support — GDPR, PCI-DSS, or DPDP (India\'s Digital Personal Data Protection Act) — we guide the implementation of controls and documentation required for compliance.`,
    includes: [
      'Security assessment & risk audit',
      'Vulnerability scanning & penetration testing',
      'Web application security (OWASP Top 10)',
      'Infrastructure hardening & configuration review',
      'Multi-factor authentication (MFA) implementation',
      'Secrets management & access control review',
      'Security incident response planning',
      'DPDP/GDPR compliance guidance',
    ],
    relatedSlugs: ['cloud-solutions-migration', 'devops-infrastructure', 'enterprise-web-applications', 'it-consulting'],
  },
  {
    slug: 'it-consulting',
    title: 'IT Consulting',
    shortTitle: 'IT Consulting',
    category: 'Support & Consulting',
    icon: '💡',
    metaTitle: 'IT Consulting Services in Udaipur, Rajasthan | QivaLabs',
    metaDescription:
      'IT consulting services in Udaipur — technology strategy, digital transformation roadmaps, vendor selection, and IT architecture advisory. QivaLabs helps businesses make better technology decisions.',
    h1: 'IT Consulting Services in Udaipur',
    tagline: 'Make better technology decisions with expert independent advice.',
    problemStatement:
      'Technology investments often fail not because of bad execution but because of bad decisions made early: the wrong platform, the wrong vendor, an architecture that doesn\'t scale, or a scope that was never properly defined.',
    solutionStatement:
      'QivaLabs provides independent IT consulting to help businesses make informed technology decisions — from platform selection and architecture reviews to digital transformation strategy and vendor assessment.',
    bodyContent: `The technology landscape is crowded with products, vendors, and consultants who all believe their solution is the right one for you. Making the right technology decisions requires independent expertise: an advisor whose recommendation isn\'t influenced by implementation revenue or vendor relationships.

QivaLabs offers independent IT consulting services to businesses in Udaipur and across India. Our consulting work typically falls into three areas: technology strategy (what should we build, buy, or automate?), architecture review (are our current systems well-designed to meet our future needs?), and vendor/platform selection (which tool or partner is right for a specific requirement?).

For businesses embarking on digital transformation — moving from paper-based or fragmented digital processes to integrated, automated systems — we help define the transformation roadmap: prioritising initiatives by impact and feasibility, sequencing them logically, and building the business case for each investment.

For businesses with existing systems, we conduct architecture reviews: assessing whether current technology choices are sustainable, identifying technical debt, and recommending a path to a more maintainable and scalable state. These reviews often uncover quick wins alongside longer-term recommendations.

Vendor and technology selection projects involve developing a structured evaluation framework, issuing RFPs, assessing responses against your specific requirements, and conducting reference checks and proof-of-concept exercises. We help you avoid the common mistake of selecting the most marketed solution rather than the most appropriate one.

Our consultants bring hands-on experience building and maintaining the systems we advise on — we\'re practitioners first, not theorists.`,
    includes: [
      'Digital transformation strategy & roadmapping',
      'IT architecture review & recommendations',
      'Technology stack assessment',
      'Vendor selection & RFP management',
      'Software platform evaluation & POC oversight',
      'IT budget planning & cost optimisation',
      'IT governance & policy framework',
      'CTO/vCTO advisory for startups & SMEs',
    ],
    relatedSlugs: ['cloud-solutions-migration', 'cybersecurity-solutions', 'custom-software-development', 'devops-infrastructure'],
  },
  {
    slug: 'quality-assurance-testing',
    title: 'Quality Assurance & Testing',
    shortTitle: 'QA & Testing',
    category: 'Software Development',
    icon: '✅',
    metaTitle: 'Quality Assurance & Software Testing Services India | QivaLabs',
    metaDescription:
      'Quality assurance and software testing services in Udaipur, India — manual testing, automated testing, performance testing, and QA strategy. QivaLabs ensures your software ships reliably.',
    h1: 'Quality Assurance & Testing Services',
    tagline: 'Ship software confidently — with systematic testing that catches issues before users do.',
    problemStatement:
      'Bugs in production erode user trust, create support burden, and can have serious business consequences for payment, data, or operational workflows. Many teams test too late, too informally, and without a structured approach.',
    solutionStatement:
      'QivaLabs establishes and executes QA processes that catch defects early — from requirements review and test planning through automated regression suites and performance testing — so your software ships reliably and updates don\'t introduce regressions.',
    bodyContent: `Quality assurance is not just testing at the end of development — it\'s a discipline that runs through the entire development lifecycle. The most expensive bugs are the ones found in production; the cheapest are the ones caught during requirements review before a line of code is written.

QivaLabs provides QA services at whatever level your project needs. For smaller projects, this might be structured manual testing with detailed test cases, exploratory testing, and bug reporting. For larger products, we build automated test suites that run continuously as part of the CI/CD pipeline.

Our QA approach starts with test planning: understanding the requirements, identifying the most critical user flows, mapping edge cases and negative scenarios, and defining the testing scope and entry/exit criteria. Good test planning makes testing efficient — focusing effort where the risk is highest.

Manual testing covers functional testing (does the software do what it should?), regression testing (do new changes break existing functionality?), cross-browser and cross-device testing for web applications, and exploratory testing that goes beyond scripted cases to find unexpected issues.

Automated testing covers unit tests (logic-level), integration tests (API and database), and end-to-end tests (user flow simulation using tools like Playwright or Cypress). Automated tests run on every commit, giving the development team instant feedback and enabling safe, frequent deployments.

Performance and load testing assesses how your application behaves under load — important for applications with variable or high user concurrency — using tools like k6 or Apache JMeter.`,
    includes: [
      'Test strategy & plan development',
      'Manual functional & regression testing',
      'Test case writing & management',
      'Automated test suite development (Playwright, Cypress)',
      'API testing (Postman, automated)',
      'Performance & load testing (k6, JMeter)',
      'Cross-browser & cross-device testing',
      'Bug reporting, tracking & verification workflows',
    ],
    relatedSlugs: ['custom-software-development', 'devops-infrastructure', 'mobile-app-development', 'enterprise-web-applications'],
  },
  {
    slug: 'devops-infrastructure',
    title: 'DevOps & Infrastructure',
    shortTitle: 'DevOps',
    category: 'IT Infrastructure',
    icon: '🛠️',
    metaTitle: 'DevOps & Infrastructure Services in Udaipur, India | QivaLabs',
    metaDescription:
      'DevOps consulting and infrastructure services in Udaipur — CI/CD pipelines, Docker, Kubernetes, infrastructure-as-code, and managed Linux server setup. QivaLabs accelerates your development workflow.',
    h1: 'DevOps & Infrastructure Services',
    tagline: 'Faster deployments, more reliable systems, and infrastructure that scales automatically.',
    problemStatement:
      'Manual deployments are slow, risky, and create bottlenecks. Without proper CI/CD pipelines, infrastructure-as-code, and monitoring, teams spend too much time on operational work rather than building features.',
    solutionStatement:
      'QivaLabs sets up DevOps infrastructure that automates the path from code commit to production deployment — with automated testing, containerisation, infrastructure-as-code, and comprehensive monitoring throughout.',
    bodyContent: `DevOps is the practice of reducing the friction between writing code and running it in production. Teams with mature DevOps practices deploy more frequently, with fewer incidents, and recover from problems faster than teams that treat operations as an afterthought.

QivaLabs implements DevOps practices and infrastructure for development teams across Udaipur and India. Our work spans three main areas: CI/CD pipeline setup, infrastructure management, and observability.

CI/CD pipelines (using GitHub Actions, GitLab CI, or Bitbucket Pipelines) automate the sequence from code push to deployment: running tests, building containers, pushing images to registries, and deploying to staging or production environments. We configure multi-environment setups with proper promotion workflows, so code moves from development → staging → production with appropriate gates at each stage.

Infrastructure management uses infrastructure-as-code tools — primarily Terraform — to define and provision servers, databases, load balancers, and network configuration. IaC means your infrastructure is version-controlled, reproducible, and auditable. We manage infrastructure on AWS, GCP, Azure, and on-premises Linux servers.

Containerisation with Docker and orchestration with Kubernetes enables consistent deployment environments and efficient resource utilisation. We set up Kubernetes clusters on managed services (EKS, GKE) or on bare metal, depending on your scale and budget.

Observability infrastructure — centralised logging (ELK, Loki), metrics (Prometheus + Grafana), and error tracking (Sentry) — gives your team visibility into application behaviour in production and fast incident response when issues occur.`,
    includes: [
      'CI/CD pipeline setup (GitHub Actions, GitLab CI)',
      'Docker containerisation & image registry setup',
      'Kubernetes cluster setup & management',
      'Infrastructure-as-code (Terraform)',
      'Linux server setup & hardening',
      'Monitoring & alerting (Prometheus, Grafana)',
      'Centralised logging (ELK stack, Loki)',
      'Backup automation & disaster recovery',
    ],
    relatedSlugs: ['cloud-solutions-migration', 'enterprise-web-applications', 'cybersecurity-solutions', 'quality-assurance-testing'],
  },
  {
    slug: 'payment-gateway-integration',
    title: 'Payment Gateway Integration',
    shortTitle: 'Payment Integration',
    category: 'Software Development',
    icon: '💳',
    metaTitle: 'Payment Gateway Integration Services Udaipur India | QivaLabs',
    metaDescription:
      'Payment gateway integration services in Udaipur, India — Razorpay, PayU, Cashfree, Stripe, and UPI integration for websites and mobile apps. QivaLabs ensures secure, seamless payment processing.',
    h1: 'Payment Gateway Integration Services',
    tagline: 'Accept payments seamlessly — with the right gateway for your business model.',
    problemStatement:
      'A clunky or unreliable payment experience is one of the most direct causes of cart abandonment and lost revenue. Choosing and correctly implementing the wrong gateway can also expose you to compliance and security risk.',
    solutionStatement:
      'QivaLabs integrates payment gateways — Razorpay, PayU, Cashfree, Stripe, or custom solutions — into your website or application, ensuring a smooth checkout experience and robust backend payment processing.',
    bodyContent: `In India\'s rapidly evolving payments landscape, the right payment integration strategy depends on your business model, customer base, and technical stack. A consumer e-commerce site has different requirements than a B2B SaaS platform collecting subscriptions, or an NBFC collecting EMI payments.

QivaLabs handles payment gateway selection and integration for businesses across the spectrum. We have integration experience with all major Indian payment processors — Razorpay, PayU, Cashfree, CCAvenue — as well as international gateways including Stripe for global businesses.

Beyond a basic payment button, robust payment integration involves: multiple payment method support (UPI, credit/debit cards, net banking, wallets, EMI), subscription and recurring billing for SaaS or membership models, automatic payment link generation for invoice-based businesses, webhook handling for asynchronous payment confirmation, refund management flows, partial payment and split payment support for marketplace models, and multi-currency support for internationally-facing businesses.

Security and compliance are critical in payment integrations. We ensure that your integration follows PCI-DSS guidelines, that card data is never handled by your servers (using tokenisation and hosted payment pages), and that fraud detection features are properly configured.

We also build the administrative interfaces your operations team needs: a payment dashboard showing transaction history, success/failure rates, and reconciliation exports that match your accounting system.`,
    includes: [
      'Payment gateway selection & account setup guidance',
      'Razorpay, PayU, Cashfree, or Stripe integration',
      'UPI, card, netbanking & wallet support',
      'Subscription & recurring billing setup',
      'Webhook handling for payment events',
      'Refund management & dispute handling flows',
      'Payment dashboard & reconciliation exports',
      'PCI-DSS compliance guidance',
    ],
    relatedSlugs: ['ecommerce-solutions', 'custom-software-development', 'loan-origination-software', 'api-development-integration'],
  },
  {
    slug: 'third-party-system-integration',
    title: 'Third-Party System Integration',
    shortTitle: 'System Integration',
    category: 'Software Development',
    icon: '🔗',
    metaTitle: 'Third-Party System Integration Services India | QivaLabs',
    metaDescription:
      'Third-party software integration services in Udaipur, India — connect your CRM, ERP, e-commerce, and business tools seamlessly. QivaLabs eliminates data silos with custom integration solutions.',
    h1: 'Third-Party System Integration Services',
    tagline: 'Break down data silos — connect every tool your business runs on.',
    problemStatement:
      'As businesses adopt more specialised software tools, the problem of system fragmentation grows: the same data lives in multiple places, updates in one system don\'t propagate to others, and reporting requires manual aggregation from multiple sources.',
    solutionStatement:
      'QivaLabs designs and builds integration solutions that connect your business tools — CRMs, ERPs, e-commerce platforms, messaging tools, and custom software — so data flows automatically across your entire technology stack.',
    bodyContent: `The average SME uses 8–12 different software tools to run their business. When these tools don\'t talk to each other, operational efficiency suffers: customer data gets duplicated, sales orders have to be manually entered into the inventory system, and generating a management report requires pulling spreadsheets from five different places.

QivaLabs builds integrations that connect your technology stack, eliminating these inefficiencies. We\'ve integrated hundreds of tool combinations for businesses across Udaipur and India — from simple two-way syncs between a CRM and an accounting tool, to complex multi-directional integrations connecting e-commerce platforms, logistics providers, ERPs, and financial systems.

Our integration work spans the full complexity range. Simple integrations (e.g. Shopify orders → Tally/QuickBooks) can be implemented using proven integration platforms like Make (Integromat) or Zapier with custom logic. Complex integrations — particularly those involving legacy systems, high data volumes, or custom business rules — require custom-built middleware built on Node.js or Python with proper queueing, error handling, and monitoring.

We support integration with all major business software used in India: Zoho suite, Tally, SAP Business One, QuickBooks, HubSpot, Salesforce, Shopify, WooCommerce, Magento, WhatsApp Business API, Twilio, Google Workspace, Microsoft 365, Shiprocket, Delhivery, and many others.

Every integration we build includes monitoring: real-time visibility into data flow health, alerting when integrations fail, and logging that allows fast root-cause analysis.`,
    includes: [
      'Integration landscape mapping & dependency analysis',
      'API-to-API integration development',
      'Middleware/ETL pipeline development',
      'Make (Integromat) / Zapier workflow setup',
      'Legacy system integration (DB-level, UI automation)',
      'Data transformation & field mapping',
      'Bidirectional sync & conflict resolution logic',
      'Integration monitoring & failure alerting',
    ],
    relatedSlugs: ['api-development-integration', 'business-automation', 'crm-erp-solutions', 'custom-software-development'],
  },
  {
    slug: 'saas-product-development',
    title: 'SaaS Product Development',
    shortTitle: 'SaaS Development',
    category: 'Software Development',
    icon: '🚀',
    metaTitle: 'SaaS Product Development Company Udaipur India | QivaLabs',
    metaDescription:
      'SaaS product development services in Udaipur, India — from MVP to scale. QivaLabs is your technical co-founder partner for building cloud-based software products with robust architecture.',
    h1: 'SaaS Product Development Services',
    tagline: 'From product idea to scalable SaaS — with a technical team that thinks like a co-founder.',
    problemStatement:
      'Building a SaaS product requires more than development skills: it requires architectural decisions that support scale, multi-tenancy from the start, subscription billing, customer onboarding UX, and operational tooling — all of which are easy to get wrong in the early stages.',
    solutionStatement:
      'QivaLabs acts as a technical co-founder partner for SaaS founders — architecting multi-tenant systems, building MVP features rapidly, setting up subscription billing, and establishing the operational foundations needed to grow a software business.',
    bodyContent: `Building a SaaS business is genuinely hard, and the technical dimension is one of the hardest parts. The decisions made in the first 3-6 months — about data architecture, multi-tenancy model, authentication, billing infrastructure, and deployment approach — will either accelerate or constrain your growth for years.

QivaLabs works with SaaS founders who need a technical team to build their product from the ground up. We bring both the engineering capability and the product thinking needed to build software that customers pay for and keep paying for.

Our SaaS development work starts with a discovery phase that goes beyond feature lists: we explore the customer jobs-to-be-done, the simplest version of the product that could deliver real value (true MVP), and the technical decisions that need to be made now versus those that can be deferred. We push back on scope where needed — over-building an MVP is one of the most common and costly mistakes we help founders avoid.

Architecture for SaaS requires specific patterns: multi-tenancy (either schema-per-tenant or row-level tenancy with proper data isolation), tenant-aware authentication using JWT and RBAC, subscription billing integration (Stripe with webhook handling for subscription lifecycle events), tenant administration and settings, usage metering for usage-based billing, and onboarding flows that get new customers to value quickly.

We also build the operational tooling that B2B SaaS requires: admin dashboards for managing customers and troubleshooting, customer health dashboards, automated onboarding sequences, and integration webhooks for enterprise customers.`,
    includes: [
      'SaaS architecture design (multi-tenancy, auth, billing)',
      'MVP scoping & product roadmap',
      'Frontend development (React/Next.js)',
      'Backend API development (Node.js/Python)',
      'Subscription billing integration (Stripe)',
      'Customer admin dashboard & settings',
      'Onboarding flow design & implementation',
      'Usage analytics & customer health instrumentation',
    ],
    relatedSlugs: ['custom-software-development', 'enterprise-web-applications', 'devops-infrastructure', 'ui-ux-design'],
  },
  {
    slug: 'database-design-management',
    title: 'Database Design & Management',
    shortTitle: 'Database Design',
    category: 'IT Infrastructure',
    icon: '🗄️',
    metaTitle: 'Database Design & Management Services Udaipur India | QivaLabs',
    metaDescription:
      'Database design, optimisation, and management services in Udaipur, India — PostgreSQL, MySQL, MongoDB, and cloud database services. QivaLabs builds databases that perform at scale.',
    h1: 'Database Design & Management Services',
    tagline: 'The right data architecture today prevents painful rebuilds tomorrow.',
    problemStatement:
      'Poor database design is invisible at small scale but becomes catastrophic as data volumes grow. Slow queries, data integrity issues, and schema designs that don\'t support new requirements are expensive to fix in production systems.',
    solutionStatement:
      'QivaLabs designs database schemas and manages database infrastructure with long-term performance and maintainability in mind — from initial schema design through ongoing optimisation and managed database services.',
    bodyContent: `Every application runs on data, and the quality of your database design directly determines the performance, maintainability, and scalability of your software system. A well-designed database handles growth gracefully; a poorly designed one becomes a bottleneck that requires increasingly expensive workarounds.

QivaLabs provides database design and management services for applications at all stages. For new projects, we design the data model from first principles: normalisation decisions, relationship design, indexing strategy, and schema naming conventions that make future development straightforward. We document the schema and the reasoning behind key design decisions.

For existing applications with performance problems, we conduct database performance audits: analysing slow query logs, reviewing indexing strategies, identifying N+1 query patterns in application code, and recommending structural changes or query rewrites that can dramatically improve response times.

We work across the major database platforms: PostgreSQL (our default recommendation for most applications), MySQL/MariaDB (for existing MySQL applications and WordPress-based systems), MongoDB (for document-oriented data and high-write workloads), and Redis (for caching, sessions, and real-time features).

Database management services include: backup configuration and verification (tested restores — not just backups), replication setup for read scaling and failover, regular maintenance windows for VACUUM, ANALYZE, and index rebuilds, slow query monitoring and proactive optimisation, and capacity planning based on growth trends.

For cloud databases (AWS RDS, Cloud SQL, Atlas), we handle the setup, configuration, and ongoing management of managed database services — balancing convenience with cost and control.`,
    includes: [
      'Database schema design & normalisation',
      'PostgreSQL, MySQL, or MongoDB setup & configuration',
      'Indexing strategy & query optimisation',
      'Database performance audit & slow query analysis',
      'Replication & high-availability setup',
      'Backup, restore, and disaster recovery configuration',
      'Cloud database management (RDS, Cloud SQL, Atlas)',
      'Database monitoring & capacity planning',
    ],
    relatedSlugs: ['custom-software-development', 'cloud-solutions-migration', 'devops-infrastructure', 'enterprise-web-applications'],
  },
  {
    slug: 'seo-performance-optimization',
    title: 'SEO & Performance Optimization',
    shortTitle: 'SEO & Performance',
    category: 'Digital & Marketing',
    icon: '⚡',
    metaTitle: 'SEO & Website Performance Optimization Services Udaipur | QivaLabs',
    metaDescription:
      'SEO and website performance optimisation services in Udaipur, India — technical SEO audits, Core Web Vitals improvement, page speed optimisation, and search rankings improvement.',
    h1: 'SEO & Performance Optimization Services',
    tagline: 'Rank higher, load faster, and convert more of the traffic you already have.',
    problemStatement:
      'Most websites leave significant SEO and performance potential unrealised: missing structured data, slow load times, poor Core Web Vitals, thin content, and technical errors that prevent Google from properly crawling and ranking their pages.',
    solutionStatement:
      'QivaLabs conducts comprehensive technical SEO and performance audits, then implements the fixes — resulting in improved search rankings, faster load times, better Core Web Vitals scores, and higher organic traffic.',
    bodyContent: `Search engine optimisation and page performance are deeply intertwined. Google\'s ranking algorithms use Core Web Vitals — Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint — as direct ranking factors, meaning a slow website doesn\'t just frustrate users; it ranks lower in search results.

QivaLabs provides technical SEO and performance services for businesses that have an existing web presence and want to get more out of it. This is particularly valuable for established businesses in Udaipur and Rajasthan that have invested in website content but aren\'t seeing expected organic traffic.

A technical SEO audit covers: crawlability issues (robots.txt misconfiguration, noindex directives), indexing status (what Google has indexed vs what exists), duplicate content and canonical tag issues, structured data (JSON-LD) implementation and errors, internal linking structure and orphan pages, heading hierarchy compliance, image alt text and file naming, URL structure and redirect chains, mobile usability issues, and page speed metrics.

Performance optimisation covers: identifying and eliminating render-blocking resources, implementing image optimisation and next-gen formats (WebP, AVIF), adding lazy loading for below-fold images, optimising JavaScript bundle size, implementing server-side caching and CDN configuration, and database query optimisation for backend-heavy applications.

We also help with content strategy: identifying keyword gaps, optimising existing pages for target queries, and creating the content brief structure for new pages that will rank for priority keywords in your market.`,
    includes: [
      'Full technical SEO audit with prioritised fix list',
      'Core Web Vitals & Lighthouse score improvement',
      'Structured data (JSON-LD schema) implementation',
      'Image optimisation (WebP conversion, compression)',
      'JavaScript & CSS bundle size optimisation',
      'Internal linking & crawl structure optimisation',
      'Google Search Console setup & error resolution',
      'Monthly SEO performance reporting',
    ],
    relatedSlugs: ['digital-marketing', 'website-design-development', 'hosting-domain-management', 'devops-infrastructure'],
  },
  {
    slug: 'hosting-domain-management',
    title: 'Hosting & Domain Management',
    shortTitle: 'Hosting',
    category: 'IT Infrastructure',
    icon: '🖥️',
    metaTitle: 'Web Hosting & Domain Management Services Udaipur India | QivaLabs',
    metaDescription:
      'Web hosting and domain management services in Udaipur, India — managed hosting, VPS setup, domain registration, SSL certificates, and server monitoring. QivaLabs keeps your sites running smoothly.',
    h1: 'Hosting & Domain Management Services',
    tagline: 'Reliable hosting, properly configured — so your sites are always up and performing.',
    problemStatement:
      'Shared hosting with basic cPanel works until it doesn\'t: slow load times from noisy neighbours, downtime with no explanation, and no support when something goes wrong at midnight. Proper hosting management requires expertise most teams don\'t have in-house.',
    solutionStatement:
      'QivaLabs handles your hosting setup, configuration, monitoring, and management — recommending the right hosting solution for your workload and managing the technical details so your sites run reliably without consuming your team\'s time.',
    bodyContent: `Good hosting is invisible: sites load fast, uptime is high, and the infrastructure handles traffic spikes without intervention. Bad hosting is very visible: slow pages, downtime emails, and a support queue that doesn\'t actually solve problems.

QivaLabs recommends hosting solutions matched to your workload, budget, and technical requirements. For static and JAMstack sites, we recommend Vercel or Netlify — where deployment is seamless and performance is automatically optimised. For Next.js applications, Vercel is our default recommendation for its deep integration with the framework. For PHP/WordPress sites, we recommend managed WordPress hosting (Kinsta, WP Engine) or cPanel-based shared hosting for simpler requirements. For custom applications requiring full server control, we provision and manage VPS servers on DigitalOcean, Hetzner, or AWS Lightsail.

Domain management includes: domain registration through reputable registrars, DNS configuration (A records, CNAME, MX for email, SPF/DKIM/DMARC records for email deliverability), SSL certificate installation and auto-renewal (Let\'s Encrypt or commercial certificates), and DNS security best practices to prevent domain hijacking.

Server management includes: OS hardening, firewall configuration (UFW/iptables), automated security updates, disk space monitoring, CPU and memory monitoring with alerting, log rotation, and regular backup verification.

We maintain clear documentation of all hosting configuration and provide clients with full access and ownership of their domains and hosting accounts — no lock-in.`,
    includes: [
      'Hosting platform selection & setup (Vercel, VPS, cPanel)',
      'Domain registration & DNS configuration',
      'SSL certificate installation & auto-renewal',
      'Email MX, SPF, DKIM & DMARC configuration',
      'Server hardening & firewall setup',
      'Uptime monitoring & incident alerting',
      'Automated backups & restore testing',
      'Performance monitoring & capacity alerts',
    ],
    relatedSlugs: ['website-design-development', 'devops-infrastructure', 'seo-performance-optimization', 'maintenance-amc'],
  },
  {
    slug: 'maintenance-amc',
    title: 'Maintenance & AMC',
    shortTitle: 'Maintenance & AMC',
    category: 'Support & Consulting',
    icon: '🔧',
    metaTitle: 'Website & Software Maintenance AMC Services Udaipur | QivaLabs',
    metaDescription:
      'Annual Maintenance Contract (AMC) and ongoing maintenance services for websites and software in Udaipur, India. QivaLabs provides proactive monitoring, updates, and support for your digital systems.',
    h1: 'Website & Software Maintenance & AMC',
    tagline: 'Keep your digital systems healthy, secure, and up to date with a structured maintenance plan.',
    problemStatement:
      'Software and websites deteriorate without maintenance: dependencies become outdated and vulnerable, content becomes stale, performance degrades over time, and small issues become big problems. Most businesses don\'t have the internal expertise for proactive maintenance.',
    solutionStatement:
      'QivaLabs offers Annual Maintenance Contracts (AMC) that provide structured, proactive maintenance for your websites and software — covering security updates, performance monitoring, content changes, bug fixes, and regular health checks.',
    bodyContent: `A digital product is never really "done". Software dependencies release security patches. Browser updates can break CSS or JavaScript. Database tables grow and slow queries emerge. Content gets outdated. Forms break silently. Without regular maintenance attention, even a well-built system will gradually deteriorate.

QivaLabs\' maintenance and AMC (Annual Maintenance Contract) service provides your business with a dedicated maintenance arrangement — a structured commitment to keeping your digital systems healthy, secure, and performing well throughout the year.

An AMC engagement typically covers: monthly dependency updates (frameworks, libraries, plugins) to patch security vulnerabilities; proactive monitoring with alerts for downtime, errors, and performance degradation; regular security scans and certificate renewals; database maintenance and performance tuning; content updates and minor feature additions (up to a defined monthly hour allowance); quarterly comprehensive health checks with a written report; and priority response for critical issues.

We document everything we maintain and maintain an asset register for your digital properties: hosting accounts, domain registrations, SSL certificates (with expiry dates), and software version tracking. This documentation is yours — you won\'t be left without crucial information if you ever change providers.

AMC plans are tailored to the complexity of what we\'re maintaining: a simple brochure website has very different maintenance needs than a complex e-commerce platform or a custom web application with a database backend.

Regular maintenance is significantly cheaper than emergency fixes — and incomparably cheaper than a security breach or data loss event caused by an unpatched vulnerability.`,
    includes: [
      'Monthly dependency & security updates',
      'Uptime & performance monitoring',
      'SSL certificate management & renewal',
      'Regular database backup & integrity checks',
      'Bug fixes & minor content changes (monthly hours included)',
      'Quarterly health check report',
      'Priority response SLA for critical issues',
      'Asset register & documentation maintenance',
    ],
    relatedSlugs: ['hosting-domain-management', 'website-design-development', '24-7-technical-support', 'dedicated-account-management'],
  },
  {
    slug: 'technical-documentation-training',
    title: 'Technical Documentation & Training',
    shortTitle: 'Documentation',
    category: 'Support & Consulting',
    icon: '📚',
    metaTitle: 'Technical Documentation & Training Services Udaipur India | QivaLabs',
    metaDescription:
      'Technical documentation and software training services in Udaipur, India — user manuals, API documentation, SOPs, knowledge bases, and team training programs. QivaLabs documents your systems.',
    h1: 'Technical Documentation & Training Services',
    tagline: 'Turn undocumented systems into well-understood assets your team can independently manage.',
    problemStatement:
      'Knowledge locked in the heads of a few key people is an operational and business risk. When undocumented systems break, or key personnel leave, teams are left unable to troubleshoot, maintain, or evolve critical business technology.',
    solutionStatement:
      'QivaLabs creates comprehensive technical documentation and training programs that capture system knowledge, define standard operating procedures, and give your team the skills to operate your technology confidently and independently.',
    bodyContent: `Documentation is the least glamorous part of a software project — and the most neglected. Yet poor documentation is one of the most common reasons that custom software and internal systems become expensive to maintain, difficult to hand over to new team members, and vulnerable when key knowledge holders are unavailable.

QivaLabs provides technical writing and training services that bridge the gap between working software and organisational capability.

For software systems, we produce: API documentation (following OpenAPI specification standards) that enables developers to integrate with your services reliably; administrator guides for system administrators responsible for configuration and maintenance; developer handover documentation for bespoke codebases being transferred to in-house teams or new vendors; and architecture decision records that capture the rationale behind key technical choices.

For business users, we produce: user manuals and how-to guides written in plain language for non-technical staff; standard operating procedure (SOP) documents for software-enabled business processes; video walkthroughs for complex workflows; and interactive knowledge base content suitable for internal wikis or customer-facing help centres.

Training programs are designed around the specific needs of your team: hands-on sessions covering the day-to-day workflows your staff will be responsible for, train-the-trainer sessions that build internal capability, and onboarding programs for new hires who need to get productive quickly on custom systems.

All documentation we produce is delivered in formats your team can maintain and update — editable Word/Notion/Confluence documents, not PDFs that go stale.`,
    includes: [
      'API documentation (OpenAPI/Swagger)',
      'System architecture & developer handover docs',
      'User manuals & how-to guides',
      'Standard operating procedures (SOPs)',
      'Video walkthroughs for complex workflows',
      'Knowledge base content for internal wikis',
      'Admin & operations guides',
      'Custom team training programs (online or in-person)',
    ],
    relatedSlugs: ['custom-software-development', 'it-consulting', 'maintenance-amc', 'dedicated-account-management'],
  },
  {
    slug: 'customer-support-services',
    title: 'Customer Support Services',
    shortTitle: 'Customer Support',
    category: 'Support & Consulting',
    icon: '🎧',
    metaTitle: 'Customer Support Services Setup & Management | QivaLabs India',
    metaDescription:
      'Customer support infrastructure setup in Udaipur, India — chat support, email support, phone support system setup, helpdesk implementation, and support team training. QivaLabs builds your support function.',
    h1: 'Customer Support Services & Infrastructure',
    tagline: 'Build a customer support function that resolves issues fast and keeps customers loyal.',
    problemStatement:
      'Without a structured support system, customer issues get lost in WhatsApp threads, email inboxes, and verbal conversations — leading to missed issues, inconsistent responses, long resolution times, and frustrated customers who churn.',
    solutionStatement:
      'QivaLabs designs and implements customer support infrastructure — covering chat, email, and phone channels — including helpdesk software setup, support process design, escalation workflows, and team training.',
    bodyContent: `Customer support is a direct driver of retention and word-of-mouth. Research consistently shows that customers who have a problem resolved quickly and well are often more loyal than customers who never had a problem at all. Conversely, unresolved or slow support is one of the top drivers of customer churn.

QivaLabs helps businesses build or upgrade their customer support function — not as an outsourced service provider, but as an infrastructure and process specialist that sets up the systems, workflows, and training your team needs to deliver excellent support independently.

Our support infrastructure work covers three channels: chat support (implementing live chat systems — Intercom, Freshchat, Tidio — and designing chatbot flows that handle common queries automatically, escalating to humans only when needed), email support (implementing helpdesk platforms — Freshdesk, Zoho Desk, Zendesk — with proper ticket categorisation, SLA rules, assignment logic, and response templates), and phone/WhatsApp support (configuring business phone systems with call routing, voicemail to email, and WhatsApp Business API integration for conversational support).

Beyond technology, we design support processes: escalation policies (defining which issues go to which team), response time SLAs by issue severity, knowledge base structure (so agents can find answers quickly), and quality assurance processes (review and scoring of support interactions).

We also integrate support systems with your CRM and product databases, so support agents have full customer context — purchase history, recent interactions, account status — when handling an issue.`,
    includes: [
      'Helpdesk platform setup (Freshdesk, Zoho Desk, Zendesk)',
      'Live chat setup with chatbot flows',
      'Email ticketing system & SLA configuration',
      'WhatsApp Business API integration',
      'Phone support system & call routing',
      'Knowledge base & FAQ content structure',
      'Support process design & escalation workflows',
      'Agent training & quality assurance framework',
    ],
    relatedSlugs: ['crm-erp-solutions', 'ai-integrated-automation', 'dedicated-account-management', '24-7-technical-support'],
  },
  {
    slug: 'dedicated-account-management',
    title: 'Dedicated Account Management',
    shortTitle: 'Account Management',
    category: 'Support & Consulting',
    icon: '🤝',
    metaTitle: 'Dedicated Account Management Services | QivaLabs Udaipur',
    metaDescription:
      'Dedicated account management from QivaLabs — a single point of contact for all your IT projects, proactive communication, strategic alignment, and ongoing delivery oversight.',
    h1: 'Dedicated Account Management',
    tagline: 'One trusted point of contact — coordinating everything, communicating proactively.',
    problemStatement:
      'For businesses with multiple ongoing digital projects, coordinating across different vendors, managing multiple contacts, and maintaining strategic alignment between technology and business goals becomes a full-time job in itself.',
    solutionStatement:
      'QivaLabs\' Dedicated Account Management service assigns you a single named account manager who coordinates all work, communicates proactively, manages delivery across teams, and acts as your strategic technology advisor.',
    bodyContent: `When you\'re working with a single developer on a single project, coordination is simple. When you have ongoing maintenance, active development, occasional consulting, and new projects in discussion — all across a team of specialists — coordination becomes a real challenge.

QivaLabs\' Dedicated Account Management service is designed for clients who want a trusted, single point of contact for their entire technology relationship with QivaLabs. Your Account Manager is the person who knows your business goals, your history, your preferences, and the full context of your technology portfolio.

Day-to-day, your Account Manager takes the brief for new requests, manages their prioritisation and delivery, monitors the work of the relevant specialists, and communicates progress back to you — in whatever format and cadence you prefer. You should never need to write a detailed technical specification for a change request; your AM takes that responsibility.

Strategically, your Account Manager is also a proactive advisor: flagging upcoming risks (a domain about to expire, a dependency that needs updating, a performance issue trending in the wrong direction), suggesting improvements based on emerging best practices, and helping you think through new technology initiatives before committing to them.

Monthly AMR (Account Management Review) meetings provide a regular opportunity to review delivery against objectives, discuss upcoming initiatives, and ensure that the work QivaLabs is doing continues to align with where your business is going.

Dedicated Account Management is available as a standalone service or as part of a broader retainer arrangement.`,
    includes: [
      'Named account manager for all QivaLabs work',
      'Single point of contact for requests & escalations',
      'Weekly status communication (email or meeting)',
      'Delivery coordination across specialist teams',
      'Monthly account management review meeting',
      'Proactive risk identification & advisory',
      'Project brief & scoping support',
      'Strategic technology roadmap input',
    ],
    relatedSlugs: ['maintenance-amc', 'it-consulting', 'customer-support-services', '24-7-technical-support'],
  },
  {
    slug: '24-7-technical-support',
    title: '24/7 Technical Support',
    shortTitle: '24/7 Support',
    category: 'Support & Consulting',
    icon: '🌐',
    metaTitle: '24/7 Technical Support Services India | QivaLabs',
    metaDescription:
      '24/7 technical support services for businesses in India — round-the-clock monitoring, incident response, and critical issue resolution. QivaLabs ensures your systems are always covered.',
    h1: '24/7 Technical Support Services',
    tagline: 'Round-the-clock coverage for the systems your business cannot afford to have down.',
    problemStatement:
      'Critical business systems — e-commerce stores, customer portals, payment-processing applications, and operational platforms — need to be up and performing at all hours. A major incident at 2 AM with no one available to respond is a serious business risk.',
    solutionStatement:
      'QivaLabs provides 24/7 technical support for critical systems — combining always-on monitoring, defined incident response procedures, and on-call access to engineers who can diagnose and resolve issues at any hour.',
    bodyContent: `For businesses whose operations depend on their technology — an e-commerce store that processes orders overnight, a hospitality platform serving guests across time zones, an operational system used by field teams at unusual hours — downtime at any hour is a business problem. A 6-hour outage at 3 AM is just as costly as one at 3 PM.

QivaLabs\' 24/7 Technical Support service provides round-the-clock coverage for your critical systems. It\'s built on three components: always-on automated monitoring, a defined incident response procedure, and access to QivaLabs engineers outside of business hours.

Automated monitoring watches your systems continuously: uptime monitoring with multi-location ping tests, application health checks, error rate monitoring from application logs, database connectivity and query time monitoring, SSL certificate expiry alerts, and infrastructure metrics. When a metric exceeds defined thresholds, an alert is triggered and the on-call engineer is notified immediately.

The incident response procedure defines how incidents are classified (P1/P2/P3 by business impact), what the target response and resolution times are for each severity level, and what the escalation chain looks like. Every incident generates a post-incident report documenting root cause, resolution, and preventive measures.

Outside business hours access is provided via dedicated support channels (WhatsApp or phone) monitored by on-call engineers. Response times are governed by the SLA agreed in your support contract.

24/7 support is available as a standalone service for systems QivaLabs has built, and in some cases for systems built by other vendors that we have thoroughly familiarised ourselves with.`,
    includes: [
      'Always-on uptime & health monitoring',
      'Automated alerting for all critical metrics',
      'Defined incident response procedure (P1/P2/P3 SLAs)',
      'On-call engineer access (WhatsApp/phone)',
      'Post-incident root cause analysis reports',
      'Monthly incident summary & trend reporting',
      'Proactive maintenance to prevent incidents',
      'Escalation to senior engineering for P1 incidents',
    ],
    relatedSlugs: ['maintenance-amc', 'dedicated-account-management', 'hosting-domain-management', 'devops-infrastructure'],
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'Digital & Marketing',
  'Software Development',
  'IT Infrastructure',
  'AI & Automation',
  'Support & Consulting',
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): ServiceData[] {
  return SERVICES.filter((s) => s.category === category);
}

export function getFeaturedServices(): ServiceData[] {
  const featuredSlugs = [
    'custom-software-development',
    'website-design-development',
    'mobile-app-development',
    'ai-integrated-automation',
    'digital-marketing',
    'cloud-solutions-migration',
  ];
  return featuredSlugs
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter(Boolean) as ServiceData[];
}
