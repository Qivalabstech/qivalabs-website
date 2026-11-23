/**
 * QivaLabs, shared site script.
 * GSAP + ScrollTrigger (CDN) for motivated scroll storytelling: staggered
 * reveals, animated stat counters, magnetic CTA hover. Falls back to an
 * instant, static state if GSAP fails to load or reduced-motion is set.
 * Nav toggle, portfolio/service filtering, and the contact-form handler
 * are plain JS, no dependency.
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  /* ---- Header scroll state ------------------------------------------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile nav toggle ------------------------------------------------ */
  var navToggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll reveal ----------------------------------------------------
   * [data-reveal]: fades/slides in once, staggered within [data-reveal-group].
   * GSAP-driven when available; IntersectionObserver fallback otherwise.
   * Communicates hierarchy (what to look at first) as content enters view.
   */
  var revealTargets = document.querySelectorAll('[data-reveal]');
  if (revealTargets.length) {
    if (prefersReducedMotion) {
      revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
    } else if (hasGSAP) {
      document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
        var items = Array.prototype.filter.call(group.querySelectorAll('[data-reveal]'), function (el) {
          return el.closest('[data-reveal-group]') === group;
        });
        gsap.timeline({ scrollTrigger: { trigger: group, start: 'top 85%', once: true } }).to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'back.out(1.4)',
          stagger: 0.12,
          onStart: function () { items.forEach(function (el) { el.classList.add('is-visible'); }); },
        });
      });
      document.querySelectorAll('[data-reveal]:not([data-reveal-group] [data-reveal])').forEach(function (el) {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onStart: function () { el.classList.add('is-visible'); },
        });
      });
    } else if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      revealTargets.forEach(function (el) { io.observe(el); });
    } else {
      revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* ---- Word-by-word headline reveal --------------------------------------
   * [data-text-reveal]: splits the heading into words and staggers them in
   * on load. Communicates "this is the one sentence to read first" on the
   * hero, the single highest-priority element on the page. Runs once, on
   * load rather than scroll, since it's always the first thing in view.
   */
  document.querySelectorAll('[data-text-reveal]').forEach(function (heading) {
    var words = heading.textContent.trim().split(/\s+/);
    heading.innerHTML = words.map(function (w) { return '<span class="word">' + w + '</span>'; }).join(' ');
    var spans = heading.querySelectorAll('.word');
    if (prefersReducedMotion || !hasGSAP) {
      spans.forEach(function (s) { s.style.opacity = 1; s.style.transform = 'none'; });
      return;
    }
    gsap.to(spans, { opacity: 1, y: 0, rotateZ: 0, duration: 0.85, ease: 'back.out(1.6)', stagger: 0.07, delay: 0.15 });
  });

  /* ---- Animated stat counters --------------------------------------------
   * Communicates scale (60+ projects, 31 services) with a count-up as the
   * stat enters view, once, tied to real DOM values (no faked precision).
   */
  document.querySelectorAll('[data-count-to]').forEach(function (el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    var suffix = el.getAttribute('data-count-suffix') || '';
    if (prefersReducedMotion || !hasGSAP) { el.textContent = target + suffix; return; }
    var obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: function () { el.textContent = Math.round(obj.val) + suffix; },
    });
  });

  /* ---- Marquee (max one per page, CSS-var driven, GSAP-tweened) --------- */
  document.querySelectorAll('[data-marquee]').forEach(function (track) {
    if (prefersReducedMotion) return;
    var clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);
    var speed = parseFloat(track.getAttribute('data-marquee')) || 40;
    if (hasGSAP) {
      gsap.to([track, clone], { xPercent: -100, duration: speed, ease: 'none', repeat: -1 });
    }
  });

  /* ---- Magnetic primary CTA -----------------------------------------------
   * Subtle pull-toward-cursor on the header/hero primary button only, signals
   * "this is the one action that matters." Transform-only, cheap, capped.
   */
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      var strength = 22;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / r.width;
        var y = (e.clientY - r.top - r.height / 2) / r.height;
        var tx = x * strength;
        var ty = y * strength;
        if (hasGSAP) {
          gsap.to(el, { x: tx, y: ty, duration: 0.3, ease: 'power2.out' });
        } else {
          el.style.transform = 'translate(' + tx + 'px,' + ty + 'px)';
        }
      });
      el.addEventListener('mouseleave', function () {
        if (hasGSAP) gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        else el.style.transform = '';
      });
    });
  }

  /* ---- Abstract hero visual parallax --------------------------------------
   * The panels drift slightly with the cursor, communicates depth/layering
   * (the brand idea of "layered systems") on the one visual element that
   * has no photograph to carry that idea instead.
   */
  if (!prefersReducedMotion && hasGSAP && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.visual-abstract').forEach(function (visual) {
      var panels = visual.querySelectorAll('.panel');
      visual.addEventListener('mousemove', function (e) {
        var r = visual.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / r.width;
        var y = (e.clientY - r.top - r.height / 2) / r.height;
        panels.forEach(function (panel, i) {
          var depth = (i + 1) * 6;
          gsap.to(panel, { x: x * depth, y: y * depth, duration: 0.6, ease: 'power2.out' });
        });
      });
      visual.addEventListener('mouseleave', function () {
        gsap.to(panels, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  /* ---- Card tilt --------------------------------------------------------
   * Subtle 3D tilt toward the cursor on cards, communicates "this is a
   * physical, liftable object" rather than a flat rectangle. Transform-only,
   * GPU-cheap. The existing CSS :hover lift still applies as a no-JS/touch
   * fallback; once JS sets an inline transform it naturally takes over.
   */
  if (!prefersReducedMotion && hasGSAP && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.style.transformPerspective = '900px';
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, {
          y: -7,
          rotateX: py * -6,
          rotateY: px * 8,
          transformPerspective: 900,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
      card.addEventListener('mouseleave', function () {
        gsap.to(card, { y: 0, rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
      });
    });
  }

  /* ---- Sticky-stack (process / how-we-work) -----------------------------
   * Cards pin and shrink as the next one arrives, communicates sequence
   * (step 1 gives way to step 2) rather than a flat list.
   */
  document.querySelectorAll('[data-stack-pin]').forEach(function (wrap) {
    if (prefersReducedMotion || !hasGSAP) return;
    var cards = Array.prototype.slice.call(wrap.querySelectorAll('.stack-card'));
    cards.forEach(function (card, i) {
      if (i === cards.length - 1) return;
      ScrollTrigger.create({
        trigger: card,
        start: 'top top+=72',
        endTrigger: cards[cards.length - 1],
        end: 'top top+=72',
        pin: true,
        pinSpacing: false,
      });
      gsap.to(card, {
        scale: 0.94,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top+=72', scrub: true },
      });
    });
  });

  /* ---- Filtering (portfolio + services index) ---------------------------- */
  document.querySelectorAll('[data-filter-bar]').forEach(function (bar) {
    var targetSelector = bar.getAttribute('data-filter-bar');
    var items = document.querySelectorAll(targetSelector);
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      bar.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      var value = btn.getAttribute('data-filter');
      items.forEach(function (item) {
        var match = value === 'all' || item.getAttribute('data-category') === value;
        item.hidden = !match;
      });
    });
  });

  /* ---- Contact / lead forms ------------------------------------------------
   * Posts JSON to the standalone Express API (see /server). Set
   * window.QIVA_API_URL before this script loads to point at a deployed
   * API host; defaults to same-origin /api for local/same-host setups.
   */
  var API_BASE = window.QIVA_API_URL || '';

  document.querySelectorAll('form[data-lead-form]').forEach(function (form) {
    var endpoint = form.getAttribute('data-lead-form');
    if (!form.querySelector('[name="website_hp"]')) {
      var hp = document.createElement('div');
      hp.setAttribute('aria-hidden', 'true');
      hp.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;';
      hp.innerHTML = '<label>Leave this empty<input type="text" name="website_hp" tabindex="-1" autocomplete="off"></label>';
      form.appendChild(hp);
    }
    var statusEl = form.querySelector('[data-form-status]') || (form.parentElement && form.parentElement.querySelector('[data-form-status]'));
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });
      data.page = location.href;
      try {
        var utm = JSON.parse(sessionStorage.getItem('qv_utm') || '{}');
        Object.keys(utm).forEach(function (k) { if (!data[k]) data[k] = utm[k]; });
      } catch (err) {}

      if (statusEl) { statusEl.hidden = true; statusEl.className = 'form-status'; }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.textContent;
        submitBtn.textContent = 'Sending';
      }

      fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(function (res) {
          if (res.status === 400) {
            return res.json().catch(function () { return {}; }).then(function (j) {
              var e = new Error(j.error || 'Please check the form.'); e.validation = true; throw e;
            });
          }
          if (!res.ok) throw new Error('Request failed');
          form.reset();
          if (window.gtag) { try { window.gtag('event', 'generate_lead', { form: endpoint }); } catch (e) {} }
          if (statusEl) {
            statusEl.textContent = endpoint.indexOf('career') > -1 ? 'Thanks, your application is in. We will reply if it is a fit.' : "Thanks. We'll be in touch within 48 hours.";
            statusEl.classList.add('form-status--success');
            statusEl.hidden = false;
            statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        })
        .catch(function (err) {
          if (err && err.validation) {
            if (statusEl) { statusEl.textContent = err.message; statusEl.classList.add('form-status--error'); statusEl.hidden = false; }
            return;
          }
          var lines = Object.keys(data).filter(function (k) { return data[k] && k !== 'website_hp' && k.indexOf('utm_') !== 0 && k !== 'page'; }).map(function (k) { return k + ': ' + data[k]; }).join('\n');
          var mail = 'mailto:sales@qivalabs.com?subject=' + encodeURIComponent('Website enquiry from ' + (data.name || data.applicant_name || 'website')) + '&body=' + encodeURIComponent(lines);
          var wa = 'https://wa.me/917231873730?text=' + encodeURIComponent(lines);
          if (statusEl) {
            statusEl.innerHTML = 'We could not send this automatically. Your details are kept below, tap one to send them in one step: <a href="' + mail + '">Email sales@qivalabs.com</a> or <a href="' + wa + '" target="_blank" rel="noopener">WhatsApp us</a>.';
            statusEl.classList.add('form-status--error');
            statusEl.hidden = false;
          }
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.originalText; }
        });
    });
  });


  /* ---- Remember UTM tags from the landing page for the lead form -------- */
  try {
    var qs = new URLSearchParams(location.search), utmSeen = {};
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) { if (qs.get(k)) utmSeen[k] = qs.get(k).slice(0, 100); });
    if (Object.keys(utmSeen).length) sessionStorage.setItem('qv_utm', JSON.stringify(utmSeen));
  } catch (err) {}

  var ADMIN_API = window.QIVA_ADMIN_API || '/admin/api/public';
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---- Site settings from the admin (announcement, hiring badge, contact) */
  function applySettings(st) {
    if (!st) return;
    var a = st.announcement || {};
    var dismissed = '';
    try { dismissed = localStorage.getItem('qv_ann_x') || ''; } catch (err) {}
    if (a.enabled && a.text && dismissed !== a.text && !document.querySelector('.announce')) {
      var bar = document.createElement('div');
      bar.className = 'announce';
      bar.innerHTML = '<div class="container announce__in"><span>' + esc(a.text) + '</span>' +
        (a.link ? ' <a href="' + esc(a.link) + '">' + esc(a.link_text || 'Learn more') + ' &rarr;</a>' : '') +
        '<button type="button" class="announce__x" aria-label="Dismiss">&times;</button></div>';
      document.body.insertBefore(bar, document.body.firstChild);
      bar.querySelector('.announce__x').addEventListener('click', function () {
        bar.remove();
        try { localStorage.setItem('qv_ann_x', a.text); } catch (err) {}
      });
    }
    var h = st.hiring || {};
    if (h.enabled) {
      document.querySelectorAll('.nav-links a[href="/career"], .mobile-menu a[href="/career"]').forEach(function (l) {
        if (!l.querySelector('.hiring-dot')) l.insertAdjacentHTML('beforeend', ' <span class="hiring-dot" title="' + esc(h.text || 'We are hiring') + '">Hiring</span>');
      });
    }
    var c = st.contact || {};
    if (c.email && c.email !== 'sales@qivalabs.com') {
      document.querySelectorAll('a[href^="mailto:sales@qivalabs.com"]').forEach(function (l) {
        l.href = l.href.replace('sales@qivalabs.com', c.email);
        if (l.textContent.indexOf('sales@qivalabs.com') > -1) l.textContent = l.textContent.replace('sales@qivalabs.com', c.email);
      });
    }
    if (c.whatsapp && c.whatsapp !== '917231873730') {
      document.querySelectorAll('a[href*="wa.me/917231873730"]').forEach(function (l) { l.href = l.href.replace('917231873730', c.whatsapp.replace(/\D/g, '')); });
    }
    if (c.phone && c.phone !== '+91 72318 73730') {
      document.querySelectorAll('a[href^="tel:"]').forEach(function (l) {
        if (l.textContent.indexOf('72318') > -1) l.textContent = c.phone;
        l.href = 'tel:' + c.phone.replace(/[^\d+]/g, '');
      });
    }
  }
  try {
    var cached = JSON.parse(sessionStorage.getItem('qv_settings') || 'null');
    if (cached && Date.now() - cached.t < 5 * 60 * 1000) applySettings(cached.v);
    else fetch(ADMIN_API + '/settings').then(function (r) { return r.ok ? r.json() : null; }).then(function (v) {
      if (!v) return;
      try { sessionStorage.setItem('qv_settings', JSON.stringify({ t: Date.now(), v: v })); } catch (err) {}
      applySettings(v);
    }).catch(function () {});
  } catch (err) {}

  /* ---- Career page: live roles from the admin --------------------------- */
  var listEl = document.getElementById('career-listings');
  var roleSelect = document.getElementById('jobId');
  if (listEl || roleSelect) {
    var TYPE = { 'full-time': 'Full-time', 'part-time': 'Part-time', contract: 'Contract', commission: 'Commission-based' };
    var md = function (t) {
      return esc(t).split(/\n{2,}/).map(function (p) {
        p = p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        return '<p class="mt-2">' + p.replace(/\n/g, '<br>') + '</p>';
      }).join('');
    };
    fetch(ADMIN_API + '/careers').then(function (r) { return r.json(); }).then(function (d) {
      var jobs = (d && d.items) || [];
      if (roleSelect) {
        roleSelect.innerHTML = '<option value="">Choose a role</option>' + jobs.map(function (j) { return '<option value="' + esc(j.id) + '">' + esc(j.title) + '</option>'; }).join('') + '<option value="General application">General application</option>';
      }
      if (!listEl) return;
      if (!jobs.length) {
        listEl.innerHTML = '<div class="card" style="padding:2rem;text-align:center;"><h3>No open roles right now.</h3><p class="mt-2">Send a general application below and we will reach out when something fits.</p></div>';
        return;
      }
      listEl.innerHTML = jobs.map(function (j) {
        var tags = [j.department, j.location, TYPE[j.employment_type] || j.employment_type, j.experience, j.salary_range].filter(Boolean)
          .map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join(' ');
        var req = (j.requirements || []).length ? '<h4 class="mt-3" style="font-size:.95rem;">What you need</h4><ul class="includes-list mt-2">' + j.requirements.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' : '';
        return '<details class="card job-card mt-3"><summary><span class="job-card__title">' + esc(j.title) + '</span><span class="job-card__tags">' + tags + '</span></summary>' +
          '<div class="job-card__body">' + md(j.description || '') + req +
          '<a href="#apply" class="btn btn--primary mt-3" data-apply="' + esc(j.id) + '">Apply for this role</a></div></details>';
      }).join('');
      var first = listEl.querySelector('details'); if (first) first.open = true;
      listEl.addEventListener('click', function (e) {
        var b = e.target.closest('[data-apply]');
        if (b && roleSelect) roleSelect.value = b.getAttribute('data-apply');
      });
    }).catch(function () {
      if (listEl) listEl.innerHTML = '<div class="card" style="padding:2rem;text-align:center;"><h3>We could not load the open roles.</h3><p class="mt-2">You can still apply below, or email <a href="mailto:sales@qivalabs.com">sales@qivalabs.com</a>.</p></div>';
    });
  }

  /* ---- Current year in footer -------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- Fixed grain overlay (added via JS so it never blocks paint) ------- */
  if (!document.querySelector('.grain')) {
    var grain = document.createElement('div');
    grain.className = 'grain';
    document.body.appendChild(grain);
  }
})();
