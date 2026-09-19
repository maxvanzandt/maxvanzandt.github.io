/* ---------------------------------------------------------
   1. Hero: two normal densities, computed from real values.
   2. About: photo carousel.
   --------------------------------------------------------- */

(function heroPlot() {
  var svg = document.getElementById('effect-plot');
  if (!svg) return;

  var BASE = 180, TOP = 34, LEFT = 20, RIGHT = 540;
  var control = { mu: 215, sd: 62 };
  var treat = { mu: 330, sd: 62 };

  function density(x, p) {
    var z = (x - p.mu) / p.sd;
    return Math.exp(-0.5 * z * z);
  }

  function curvePath(p, close) {
    var d = '';
    for (var x = LEFT; x <= RIGHT; x += 2) {
      var y = BASE - (BASE - TOP) * density(x, p);
      d += (d === '' ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(2);
    }
    if (close) d += 'L' + RIGHT + ' ' + BASE + 'L' + LEFT + ' ' + BASE + 'Z';
    return d;
  }

  function peakY(p) { return BASE - (BASE - TOP) * density(p.mu, p); }

  function set(id, attrs) {
    var el = document.getElementById(id);
    if (!el) return;
    for (var k in attrs) el.setAttribute(k, attrs[k]);
  }

  set('curve-control', { d: curvePath(control, false) });
  set('curve-treat', { d: curvePath(treat, false) });
  set('curve-control-fill', { d: curvePath(control, true) });
  set('curve-treat-fill', { d: curvePath(treat, true) });
  set('mean-control', { x1: control.mu, y1: peakY(control), x2: control.mu, y2: BASE });
  set('mean-treat', { x1: treat.mu, y1: peakY(treat), x2: treat.mu, y2: BASE });

  var deltaLine = document.querySelector('#delta line');
  if (deltaLine) {
    var dy = BASE + 18;
    deltaLine.setAttribute('x1', control.mu);
    deltaLine.setAttribute('y1', dy);
    deltaLine.setAttribute('x2', treat.mu);
    deltaLine.setAttribute('y2', dy);
  }

  // One page-load reveal. Nothing else on the page moves on its own.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var t = document.getElementById('curve-treat');
    var len = t.getTotalLength();
    t.style.strokeDasharray = len;
    t.style.strokeDashoffset = len;
    t.style.transition = 'stroke-dashoffset 1100ms cubic-bezier(.22,.61,.36,1) 250ms';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { t.style.strokeDashoffset = '0'; });
    });
  }
})();

(function carousel() {
  var root = document.querySelector('[data-carousel]');
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll('.carousel-slide'));
  var dotWrap = root.querySelector('.carousel-dots');
  var prev = root.querySelector('.carousel-btn.prev');
  var next = root.querySelector('.carousel-btn.next');
  if (slides.length < 2) {
    if (prev) prev.style.display = 'none';
    if (next) next.style.display = 'none';
    return;
  }

  var index = 0;
  var dots = slides.map(function (_, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Photo ' + (i + 1) + ' of ' + slides.length);
    b.addEventListener('click', function () { go(i); });
    dotWrap.appendChild(b);
    return b;
  });

  function go(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle('is-active', n === index); });
    dots.forEach(function (d, n) { d.classList.toggle('is-active', n === index); });
    // load the neighbour ahead of time so the next click is instant
    var ahead = slides[(index + 1) % slides.length];
    if (ahead && ahead.loading === 'lazy') ahead.loading = 'eager';
  }

  prev.addEventListener('click', function () { go(index - 1); });
  next.addEventListener('click', function () { go(index + 1); });

  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { go(index - 1); }
    if (e.key === 'ArrowRight') { go(index + 1); }
  });

  var x0 = null;
  var frame = root.querySelector('.carousel-frame');
  frame.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  frame.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) { go(dx < 0 ? index + 1 : index - 1); }
    x0 = null;
  }, { passive: true });

  go(0);
})();
