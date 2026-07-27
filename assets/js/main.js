/**
 * QivaLabs — shared site script.
 * Vanilla JS, no dependencies: nav toggle + scroll shadow, IntersectionObserver
 * scroll-reveal, smooth-scroll for in-page anchors, portfolio/service filtering,
 * and the contact form submit handler.
 */
(function () {
  'use strict';

  /* ---- Header scroll state ------------------------------------------ */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile nav toggle --------------------------------------------- */
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

  /* ---- Scroll reveal --------------------------------------------------
   * Any element with [data-reveal] fades/slides in once it enters the
   * viewport. Groups ([data-reveal-group] children) get a staggered delay
   * via the --i custom property, set here from DOM order.
   */
  var revealTargets = document.querySelectorAll('[data-reveal]');
  if (revealTargets.length) {
    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.style.setProperty('--i', i);
      });
    });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      revealTargets.forEach(function (el) { io.observe(el); });
    } else {
      revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* ---- Filtering (portfolio + services index) ------------------------ */
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

  /* ---- Contact / lead forms ------------------------------------------
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

      if (statusEl) {
        statusEl.hidden = true;
        statusEl.className = 'form-status';
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.textContent;
        submitBtn.textContent = 'Sending…';
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
            statusEl.textContent = "Thanks — we'll be in touch within 48 hours.";
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
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText;
          }
        });
    });
  });

  /* ---- Current year in footer ----------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
