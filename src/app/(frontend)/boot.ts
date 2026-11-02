/**
 * Inline <head> script. It runs before React hydrates, so on a slow phone the
 * text animations work from the first scroll instead of after the bundle loads:
 *
 * - adds the `js` class (scroll-reveal hides content only when JS runs);
 * - reveals the masked manifesto lines as each enters the screen; lines that are
 *   already on screen at load wait for the first scroll so the rise is seen
 *   (RevealObserver leaves [data-boot] lines alone and handles client-side navigation);
 * - drives the approach paragraph's scroll colouring (same maths as ColorReveal,
 *   which steps aside when this has already attached).
 *
 * Plain ES5 on purpose; keep the numbers in sync with ColorReveal.tsx.
 */
export const BOOT = `document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', function () {
  if ('IntersectionObserver' in window) {
    // A line already on the first screen at load (the white section can peek under a short
    // hero on phones) waits for the first scroll, so its rise is actually seen.
    var started = false, waiting = [];
    function reveal(line) { line.querySelectorAll('[data-reveal="mask"]').forEach(function (el) { el.setAttribute('data-revealed', ''); }); }
    function start() {
      if (started) return;
      started = true;
      waiting.forEach(reveal);
      removeEventListener('scroll', start);
    }
    addEventListener('scroll', start, { passive: true });
    setTimeout(start, 2000);
    var first = true;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting && e.boundingClientRect.bottom > 0) return;
        io.unobserve(e.target);
        if (first && !started && e.isIntersecting) waiting.push(e.target);
        else reveal(e.target);
      });
      first = false;
    });
    document.querySelectorAll('[data-reveal="mask"]').forEach(function (el) {
      el.setAttribute('data-boot', '');
      io.observe(el.parentElement);
    });
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var GREY = [196, 198, 206], BLUE = [67, 85, 245], INK = [13, 16, 32], WINDOW = 5, START = 0.9, END = 0.72;
  function mix(a, b, t) { return 'rgb(' + a.map(function (v, k) { return Math.round(v + (b[k] - v) * t); }).join(',') + ')'; }
  document.querySelectorAll('[data-color-text]').forEach(function (el) {
    if (el.dataset.colorReveal === 'on') return;
    el.dataset.colorReveal = 'on';
    var words = el.querySelectorAll('[data-w]'), last = -1, frame = 0;
    function update() {
      frame = 0;
      if (!el.isConnected) { removeEventListener('scroll', schedule); removeEventListener('resize', schedule); return; }
      var vh = innerHeight, r = el.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (vh * START - r.top) / (vh * (START - END) + r.height)));
      if (p === last) return;
      last = p;
      var head = p * (words.length + WINDOW);
      for (var i = 0; i < words.length; i++) {
        var t = Math.min(1, Math.max(0, (head - i) / WINDOW)), keep = words[i].hasAttribute('data-keep');
        words[i].style.color = t < 0.5 ? mix(GREY, BLUE, t * 2) : keep ? mix(BLUE, BLUE, 0) : mix(BLUE, INK, (t - 0.5) * 2);
      }
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    update();
  });
});`
