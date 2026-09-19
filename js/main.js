/* Draws the two normal densities in the hero.
   Control and treatment share a variance; the treatment mean is shifted right.
   Everything is computed from real density values rather than eyeballed. */

(function () {
  var svg = document.getElementById('effect-plot');
  if (!svg) return;

  var BASE = 180;   // baseline y
  var TOP = 34;     // y at the peak
  var LEFT = 20;
  var RIGHT = 540;

  var control = { mu: 215, sd: 62 };
  var treat = { mu: 330, sd: 62 };

  function density(x, p) {
    var z = (x - p.mu) / p.sd;
    return Math.exp(-0.5 * z * z);
  }

  function curvePath(p, close) {
    var d = '';
    var step = 2;
    for (var x = LEFT; x <= RIGHT; x += step) {
      var y = BASE - (BASE - TOP) * density(x, p);
      d += (d === '' ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(2);
    }
    if (close) {
      d += 'L' + RIGHT + ' ' + BASE + 'L' + LEFT + ' ' + BASE + 'Z';
    }
    return d;
  }

  function peakY(p) {
    return BASE - (BASE - TOP) * density(p.mu, p);
  }

  function set(id, attrs) {
    var el = document.getElementById(id);
    if (!el) return null;
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
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

  // One page-load reveal: draw the treatment curve in. Nothing else moves.
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
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
