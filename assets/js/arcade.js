/**
 * QivaLabs arcade layer: the "playable" parts of the site.
 *  - Bug Squash mini-game (homepage hero + PLAY modal on every page)
 *  - one collectible Q-coin hidden on every page, counted in the header HUD
 *  - pixel cursor trail, Konami-code party mode
 * No dependencies. Respects prefers-reduced-motion.
 */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------------- tiny sound ---------------- */
  var actx = null;
  function blip(freq, dur, type, vol) {
    try {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      var o = actx.createOscillator(), g = actx.createGain();
      o.type = type || 'square'; o.frequency.value = freq;
      g.gain.setValueAtTime(vol || 0.04, actx.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + (dur || 0.08));
      o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + (dur || 0.08));
    } catch (e) {}
  }

  /* ---------------- toast ---------------- */
  var toastEl = null, toastT = 0;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('is-on'); clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('is-on'); }, 3200);
  }

  /* =====================================================================
     BUG SQUASH
     ===================================================================== */
  var SPR = [ // 8x8 bug sprite, 1 = body, 2 = eye
    '0.1....1', '..1..1..', '.111111.', '12111121', '.111111.', '11111111', '.1.11.1.', '1..11..1'
  ];
  function BugGame(root) {
    this.root = root; this.cv = root.querySelector('canvas'); this.ctx = this.cv.getContext('2d');
    this.W = 640; this.H = 480; this.cv.width = this.W; this.cv.height = this.H;
    this.hud = { score: root.querySelector('[data-g-score]'), time: root.querySelector('[data-g-time]'), best: root.querySelector('[data-g-best]') };
    this.start = root.querySelector('[data-g-start]'); this.over = root.querySelector('[data-g-over]');
    this.state = 'idle'; this.bugs = []; this.parts = []; this.score = 0; this.combo = 0; this.time = 30; this.ship = 0; this.shipped = false;
    this.best = store.get('qv_best', 0); this.setHud();
    this.code = []; for (var i = 0; i < 26; i++) { var segs = [], x = 52 + (i % 4) * 14; var n = 1 + (i * 7 % 4); for (var k = 0; k < n; k++) { var w = 24 + ((i * 13 + k * 29) % 90); segs.push([x, w, ['#C6FF3D', '#FF3D9A', '#3DE8FF', '#B4B4C6', '#FFE14D'][(i + k) % 5]]); x += w + 10; } this.code.push(segs); }
    var self = this;
    this.cv.addEventListener('pointerdown', function (e) { self.hit(e); });
    root.querySelectorAll('[data-g-play]').forEach(function (b) { b.addEventListener('click', function () { self.play(); }); });
    for (var j = 0; j < 6; j++) this.spawn();
    this.last = performance.now(); this.loop = this.loop.bind(this);
    this.visible = true;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { self.visible = es[0].isIntersecting; }).observe(root);
    requestAnimationFrame(this.loop);
  }
  BugGame.prototype.setHud = function () {
    if (this.hud.score) this.hud.score.textContent = String(this.score).padStart(5, '0');
    if (this.hud.time) this.hud.time.textContent = Math.ceil(this.time);
    if (this.hud.best) this.hud.best.textContent = String(this.best).padStart(5, '0');
  };
  BugGame.prototype.spawn = function (gold) {
    var side = Math.random() * 4 | 0, x, y;
    if (side === 0) { x = -20; y = Math.random() * this.H; } else if (side === 1) { x = this.W + 20; y = Math.random() * this.H; } else if (side === 2) { x = Math.random() * this.W; y = -20; } else { x = Math.random() * this.W; y = this.H + 20; }
    var sp = (this.state === 'play' ? 70 + (30 - this.time) * 5 : 40) * (gold ? 1.6 : 1) * (0.8 + Math.random() * 0.5);
    this.bugs.push({ x: x, y: y, tx: 60 + Math.random() * (this.W - 120), ty: 60 + Math.random() * (this.H - 120), sp: sp, a: 0, ph: Math.random() * 6, gold: !!gold, s: gold ? 4.5 : 4 });
  };
  BugGame.prototype.play = function () {
    this.state = 'play'; this.score = 0; this.combo = 0; this.time = 30; this.ship = 0; this.shipped = false; this.bugs = []; this.spawnT = 0;
    for (var i = 0; i < 5; i++) this.spawn();
    if (this.start) this.start.hidden = true; if (this.over) this.over.hidden = true;
    blip(523, .08); setTimeout(function () { blip(784, .1); }, 90); this.setHud();
  };
  BugGame.prototype.end = function () {
    this.state = 'over';
    if (this.score > this.best) { this.best = this.score; store.set('qv_best', this.best); }
    this.setHud();
    if (this.over) {
      this.over.hidden = false;
      var s = this.over.querySelector('[data-g-final]'); if (s) s.textContent = this.score;
      var m = this.over.querySelector('[data-g-msg]');
      if (m) m.textContent = this.score >= 400 ? 'Senior QA energy. You would fit right in.' : this.score >= 200 ? 'Solid run. Our testers squash bugs like this every day.' : 'Bugs are sneaky. That is why we test everything twice.';
    }
    blip(392, .12); setTimeout(function () { blip(262, .2); }, 130);
  };
  BugGame.prototype.hit = function (e) {
    var r = this.cv.getBoundingClientRect();
    var x = (e.clientX - r.left) * this.W / r.width, y = (e.clientY - r.top) * this.H / r.height;
    if (this.state !== 'play') { this.burst(x, y, '#3A3A55', 4); return; }
    var hitAny = false;
    for (var i = this.bugs.length - 1; i >= 0; i--) {
      var b = this.bugs[i]; var dx = b.x - x, dy = b.y - y;
      if (dx * dx + dy * dy < (b.gold ? 900 : 760)) {
        this.bugs.splice(i, 1); hitAny = true; this.combo++;
        var pts = (b.gold ? 50 : 10) * Math.min(5, 1 + Math.floor(this.combo / 4));
        this.score += pts; this.ship = Math.min(100, this.ship + (b.gold ? 9 : 3.5));
        this.burst(b.x, b.y, b.gold ? '#FFE14D' : (Math.random() < .5 ? '#C6FF3D' : '#FF3D9A'), 14, '+' + pts);
        blip(b.gold ? 988 : 660 + Math.min(this.combo, 10) * 30, .06);
        break;
      }
    }
    if (!hitAny) { this.combo = 0; this.burst(x, y, '#3A3A55', 5); }
    if (this.ship >= 100 && !this.shipped) { this.shipped = true; this.score += 250; this.flash = 1; for (var k = 0; k < 4; k++) this.burst(this.W * Math.random(), this.H * Math.random(), ['#C6FF3D', '#FF3D9A', '#3DE8FF', '#FFE14D'][k], 26); blip(784, .1); setTimeout(function () { blip(1046, .18); }, 100); }
    this.setHud();
  };
  BugGame.prototype.burst = function (x, y, c, n, label) {
    for (var i = 0; i < n; i++) { var a = Math.random() * 6.28, s = 60 + Math.random() * 220; this.parts.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.6 + Math.random() * 0.4, c: c, sz: 3 + Math.random() * 5 }); }
    if (label) this.parts.push({ x: x, y: y, vx: 0, vy: -60, life: 0.8, label: label, c: c });
  };
  BugGame.prototype.loop = function (now) {
    var dt = Math.min(0.05, (now - this.last) / 1000); this.last = now;
    if (this.visible) { this.update(dt); this.draw(); }
    requestAnimationFrame(this.loop);
  };
  BugGame.prototype.update = function (dt) {
    if (this.state === 'play') {
      this.time -= dt; if (this.time <= 0) { this.time = 0; this.end(); }
      this.spawnT = (this.spawnT || 0) - dt;
      var target = 5 + Math.floor((30 - this.time) / 4);
      if (this.spawnT <= 0 && this.bugs.length < target) { this.spawn(Math.random() < 0.08); this.spawnT = 0.35; }
      this.setHud();
    } else if (this.bugs.length < 6) this.spawn();
    for (var i = 0; i < this.bugs.length; i++) {
      var b = this.bugs[i]; var dx = b.tx - b.x, dy = b.ty - b.y, d = Math.hypot(dx, dy);
      if (d < 12) { b.tx = 40 + Math.random() * (this.W - 80); b.ty = 40 + Math.random() * (this.H - 80); }
      b.a = Math.atan2(dy, dx); b.ph += dt * 14;
      b.x += Math.cos(b.a) * b.sp * dt + Math.cos(b.ph) * 0.6; b.y += Math.sin(b.a) * b.sp * dt + Math.sin(b.ph) * 0.6;
    }
    for (var j = this.parts.length - 1; j >= 0; j--) { var p = this.parts[j]; p.life -= dt; if (p.life <= 0) { this.parts.splice(j, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.92; p.vy *= 0.92; }
    if (this.flash) this.flash = Math.max(0, this.flash - dt * 1.5);
  };
  BugGame.prototype.draw = function () {
    var c = this.ctx, W = this.W, H = this.H;
    c.fillStyle = '#08080f'; c.fillRect(0, 0, W, H);
    // editor gutter + code lines
    c.fillStyle = '#0f0f19'; c.fillRect(0, 0, 40, H);
    c.font = '11px monospace'; c.textAlign = 'right';
    for (var i = 0; i < this.code.length; i++) {
      var y = 40 + i * 17; c.fillStyle = '#3a3a55'; c.fillText(String(i + 1), 30, y + 4);
      var segs = this.code[i]; for (var k = 0; k < segs.length; k++) { c.globalAlpha = 0.32; c.fillStyle = segs[k][2]; c.fillRect(segs[k][0], y - 4, segs[k][1], 7); }
      c.globalAlpha = 1;
    }
    // ship bar
    c.fillStyle = '#1b1b28'; c.fillRect(54, H - 26, W - 108, 12);
    var g = c.createLinearGradient(54, 0, W - 54, 0); g.addColorStop(0, '#C6FF3D'); g.addColorStop(1, '#FF3D9A');
    c.fillStyle = g; c.fillRect(54, H - 26, (W - 108) * this.ship / 100, 12);
    c.fillStyle = '#8A8AA0'; c.font = '10px monospace'; c.textAlign = 'left'; c.fillText(this.shipped ? 'APP SHIPPED  +250' : 'SHIPPING APP ' + Math.round(this.ship) + '%', 54, H - 32);
    // bugs
    for (var b = 0; b < this.bugs.length; b++) this.drawBug(this.bugs[b]);
    // particles
    for (var p = 0; p < this.parts.length; p++) {
      var q = this.parts[p]; c.globalAlpha = Math.max(0, q.life);
      if (q.label) { c.fillStyle = q.c; c.font = 'bold 18px monospace'; c.textAlign = 'center'; c.fillText(q.label, q.x, q.y); }
      else { c.fillStyle = q.c; c.fillRect(q.x, q.y, q.sz, q.sz); }
    }
    c.globalAlpha = 1;
    if (this.combo >= 4 && this.state === 'play') { c.fillStyle = '#FFE14D'; c.font = 'bold 14px monospace'; c.textAlign = 'right'; c.fillText('COMBO x' + Math.min(5, 1 + Math.floor(this.combo / 4)), W - 16, 58); }
    if (this.flash) { c.fillStyle = 'rgba(198,255,61,' + this.flash * 0.3 + ')'; c.fillRect(0, 0, W, H); }
    // scanlines
    c.fillStyle = 'rgba(0,0,0,.18)'; for (var s = 0; s < H; s += 3) c.fillRect(0, s, W, 1);
  };
  BugGame.prototype.drawBug = function (b) {
    var c = this.ctx, s = b.s; c.save(); c.translate(b.x, b.y); c.rotate(b.a + Math.PI / 2);
    var leg = Math.sin(b.ph) > 0;
    for (var y = 0; y < 8; y++) for (var x = 0; x < 8; x++) {
      var ch = SPR[y][x]; if (ch === '0' || ch === '.') { if (ch === '0' && leg) { c.fillStyle = b.gold ? '#FFE14D' : '#FF3D9A'; c.fillRect((x - 4) * s, (y - 4) * s, s, s); } continue; }
      c.fillStyle = ch === '2' ? '#08080f' : (b.gold ? '#FFE14D' : '#FF3D9A'); c.fillRect((x - 4) * s, (y - 4) * s, s, s);
    }
    c.restore();
  };

  function gameMarkup() {
    return '<div class="cabinet"><div class="cabinet__top"><span>QIVA ARCADE</span><span class="cabinet__lights"><i></i><i></i><i></i></span><span>HI <b data-g-best>00000</b></span></div>' +
      '<div class="game"><canvas aria-label="Bug Squash mini game: click or tap the bugs before time runs out"></canvas>' +
      '<div class="game__hud"><span>SCORE <b data-g-score>00000</b></span><span>TIME <b data-g-time>30</b></span></div>' +
      '<div class="game__screen" data-g-start><div><h3>BUG SQUASH</h3><p>Bugs are crawling through the code. Tap them before they ship. 30 seconds.</p><button class="btn btn--primary btn--sm" data-g-play>Press start</button><p class="pixel press" style="font-size:.7rem;margin-top:1rem;">INSERT COIN</p></div></div>' +
      '<div class="game__screen" data-g-over hidden><div><h3>GAME OVER</h3><p class="pixel" style="color:var(--yellow);font-size:1.4rem;margin:.6rem 0 .2rem;" data-g-final>0</p><p data-g-msg></p><div class="cluster" style="justify-content:center;"><button class="btn btn--primary btn--sm" data-g-play>Play again</button><a class="btn btn--ghost btn--sm" href="/contact">Ship bug-free</a></div></div></div>' +
      '</div><div class="cabinet__controls"><span class="joystick"></span><span class="pixel" style="font-size:.65rem;color:var(--muted);">1 PLAYER</span><span class="arcade-btns"><i></i><i></i></span></div></div>';
  }
  document.querySelectorAll('[data-bug-game]').forEach(function (el) { el.innerHTML = gameMarkup(); new BugGame(el); });

  /* game modal (PLAY button in the header) */
  var modal = null, modalGame = null;
  function openGame() {
    if (!modal) {
      modal = document.createElement('div'); modal.className = 'game-modal'; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-label', 'Bug Squash mini game');
      modal.innerHTML = '<button class="game-modal__close" aria-label="Close game">✕</button><div class="game-modal__box">' + gameMarkup() + '</div>';
      document.body.appendChild(modal);
      modalGame = new BugGame(modal.querySelector('.game-modal__box'));
      modal.addEventListener('click', function (e) { if (e.target === modal || e.target.classList.contains('game-modal__close')) closeGame(); });
    }
    modal.classList.add('is-open'); document.body.style.overflow = 'hidden';
  }
  function closeGame() { if (modal) { modal.classList.remove('is-open'); document.body.style.overflow = ''; } }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeGame(); });
  document.querySelectorAll('[data-open-game]').forEach(function (b) { b.addEventListener('click', openGame); });

  /* =====================================================================
     Q-COINS: one per page
     ===================================================================== */
  var path = location.pathname.replace(/\.html$/, '').replace(/\/index$/, '/') || '/';
  var got = store.get('qv_coins', []);
  var hudN = document.querySelectorAll('[data-coin-count]');
  function paintHud() { hudN.forEach(function (n) { n.textContent = got.length; }); }
  paintHud();
  document.querySelectorAll('[data-coin-hud]').forEach(function (h) { h.addEventListener('click', function () { toast(got.length ? 'You have ' + got.length + ' Q-coin' + (got.length > 1 ? 's' : '') + '. Every page hides one.' : 'Every page hides one gold Q-coin. Find them!'); }); });
  if (got.indexOf(path) === -1) {
    var h = 0; for (var i = 0; i < path.length; i++) h = (h * 31 + path.charCodeAt(i)) >>> 0;
    var secs = document.querySelectorAll('main section');
    if (secs.length) {
      var sec = secs[Math.min(secs.length - 1, 1 + (h % Math.max(1, secs.length - 1)))];
      if (getComputedStyle(sec).position === 'static') sec.style.position = 'relative';
      var coin = document.createElement('button'); coin.className = 'page-coin'; coin.setAttribute('aria-label', 'Collect the hidden Q-coin');
      coin.style.left = (6 + (h % 84)) + '%'; coin.style.top = (18 + ((h >> 5) % 60)) + '%';
      sec.appendChild(coin);
      coin.addEventListener('click', function (e) {
        e.preventDefault(); got.push(path); store.set('qv_coins', got); paintHud();
        var pop = document.createElement('span'); pop.className = 'coin-pop'; pop.textContent = '+1 Q-COIN'; pop.style.left = coin.style.left; pop.style.top = coin.style.top; sec.appendChild(pop);
        coin.remove(); blip(988, .07); setTimeout(function () { blip(1318, .12); }, 80);
        var n = got.length;
        toast(n === 1 ? 'First Q-coin! Each page hides one more.' : n === 5 ? '5 coins. Secret level unlocked: press PLAY for Bug Squash.' : n === 10 ? '10 coins. You know our site better than most clients do.' : 'Q-coins: ' + n);
        setTimeout(function () { pop.remove(); }, 1000);
      });
    }
  }

  /* =====================================================================
     cursor trail + konami
     ===================================================================== */
  if (finePointer && !reduce) {
    var pool = [], idx = 0, cols = ['#C6FF3D', '#FF3D9A', '#3DE8FF', '#FFE14D'];
    for (var t = 0; t < 14; t++) { var d = document.createElement('i'); d.className = 'trail'; d.style.opacity = 0; document.body.appendChild(d); pool.push(d); }
    var lastT = 0;
    window.addEventListener('pointermove', function (e) {
      var now = performance.now(); if (now - lastT < 28) return; lastT = now;
      var el = pool[idx++ % pool.length]; var col = cols[idx % cols.length];
      el.style.background = col; el.style.boxShadow = '0 0 8px ' + col;
      el.style.transition = 'none'; el.style.left = e.clientX - 4 + 'px'; el.style.top = e.clientY - 4 + 'px'; el.style.opacity = .8; el.style.transform = 'scale(1)';
      requestAnimationFrame(function () { el.style.transition = 'opacity .6s, transform .6s'; el.style.opacity = 0; el.style.transform = 'scale(.2) translateY(10px)'; });
    }, { passive: true });
  }
  var seq = 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a'.split(','), pos = 0;
  document.addEventListener('keydown', function (e) {
    pos = (e.key === seq[pos]) ? pos + 1 : (e.key === seq[0] ? 1 : 0);
    if (pos === seq.length) { pos = 0; document.documentElement.classList.toggle('party'); toast('Party mode. Konami code accepted.'); blip(523, .1); setTimeout(function () { blip(659, .1); }, 100); setTimeout(function () { blip(784, .2); }, 200); }
  });
  var st = document.createElement('style'); st.textContent = '.party body{animation:party 3s linear infinite}@keyframes party{to{filter:hue-rotate(360deg)}}'; document.head.appendChild(st);

  /* xp bars and anything else that just needs a visible class */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } }); }, { threshold: .3 });
    document.querySelectorAll('.xp').forEach(function (x) { io.observe(x); });
  } else document.querySelectorAll('.xp').forEach(function (x) { x.classList.add('is-visible'); });
})();
