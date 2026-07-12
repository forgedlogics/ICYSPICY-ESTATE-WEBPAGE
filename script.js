'use strict';

// ── Navbar scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Scroll reveal — passive, no clicks needed ─────────────
const revealTargets = document.querySelectorAll(
  '.fact-card, .why-card, .floor-block, .rt-block, .plan-card, ' +
  '.ideal-item, .distance-row, .faq-flat-item, ' +
  '.specs-table tr, .contact-line'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

revealTargets.forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = `opacity 0.65s ease ${(i % 5) * 0.08}s, transform 0.65s ease ${(i % 5) * 0.08}s`;
  observer.observe(el);
});

// ── Section headings reveal ───────────────────────────────
document.querySelectorAll('.section h2, .section .eyebrow').forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(14px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    }
  }, { threshold: 0.2 }).observe(el);
});

// ── Room-type reels — autoplay on scroll, tap to pause ─────
document.querySelectorAll('.rt-video').forEach(video => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { video.play().catch(()=>{}); }
      else { video.pause(); }
    });
  }, { threshold: 0.6 });
  io.observe(video);
  video.closest('.rt-slide').addEventListener('click', (ev) => {
    ev.preventDefault();
    if (video.paused) video.play().catch(()=>{}); else video.pause();
  });
});
