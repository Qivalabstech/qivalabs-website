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
        gsap.timeline({ scrollTrigger: { trigger: group, start: 'top 82%', once: true } }).to(items, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.09,
          onStart: function () { items.forEach(function (el) { el.classList.add('is-visible'); }); },
        });
      });
      document.querySelectorAll('[data-reveal]:not([data-reveal-group] [data-reveal])').forEach(function (el) {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
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
      var strength = 14;
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
    var statusEl = form.querySelector('[data-form-status]');
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });

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
          if (!res.ok) throw new Error('Request failed');
          form.reset();
          if (statusEl) {
            statusEl.textContent = "Thanks. We'll be in touch within 48 hours.";
            statusEl.classList.add('form-status--success');
            statusEl.hidden = false;
          }
        })
        .catch(function () {
          if (statusEl) {
            statusEl.textContent = 'Something went wrong. Please email us directly at hello@qivalabs.com.';
            statusEl.classList.add('form-status--error');
            statusEl.hidden = false;
          }
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.originalText; }
        });
    });
  });

  /* ---- Current year in footer -------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- Fixed grain overlay (added via JS so it never blocks paint) ------- */
  if (!document.querySelector('.grain')) {
    var grain = document.createElement('div');
    grain.className = 'grain';
    document.body.appendChild(grain);
  }
})();
