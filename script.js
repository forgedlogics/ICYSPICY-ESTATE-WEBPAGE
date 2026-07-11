'use strict';

// ── Navbar scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Scroll reveal — passive, no clicks needed ─────────────
const revealTargets = document.querySelectorAll(
  '.fact-card, .why-card, .floor-block, .ph-item, .plan-card, ' +
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

// ── Instagram-style video reel — tap to play, auto-play on scroll ────────────
document.querySelectorAll('.reel-item').forEach(item => {
  const video = item.querySelector('.reel-video');
  if (!video) return;

  // Auto-play when 60% visible
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        video.play().catch(() => {});
        item.classList.add('playing');
      } else {
        video.pause();
        item.classList.remove('playing');
      }
    });
  }, { threshold: 0.6 });

  obs.observe(item);

  // Tap to pause / resume
  item.addEventListener('click', () => {
    if (video.paused) {
      video.play().catch(() => {});
      item.classList.add('playing');
    } else {
      video.pause();
      item.classList.remove('playing');
    }
  });
});
