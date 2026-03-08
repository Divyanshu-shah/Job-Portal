/**
 * Reusable GSAP + ScrollTrigger animation utilities.
 * Import these in components for consistent scroll-driven animations.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ---- Fade Up ---- */
export function fadeUp(element, options = {}) {
  return gsap.fromTo(
    element,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: options.duration || 1,
      delay: options.delay || 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: options.start || 'top 85%',
        end: options.end || 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...options.scrollTrigger,
      },
    }
  );
}

/* ---- Fade In (generic) ---- */
export function fadeIn(element, options = {}) {
  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: options.duration || 1,
      delay: options.delay || 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: options.start || 'top 85%',
        toggleActions: 'play none none reverse',
        ...options.scrollTrigger,
      },
    }
  );
}

/* ---- Slide from left/right ---- */
export function slideIn(element, direction = 'left', options = {}) {
  const x = direction === 'left' ? -80 : 80;
  return gsap.fromTo(
    element,
    { x, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: options.duration || 1,
      delay: options.delay || 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: options.start || 'top 85%',
        toggleActions: 'play none none reverse',
        ...options.scrollTrigger,
      },
    }
  );
}

/* ---- Scale In ---- */
export function scaleIn(element, options = {}) {
  return gsap.fromTo(
    element,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: options.duration || 0.8,
      delay: options.delay || 0,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: element,
        start: options.start || 'top 85%',
        toggleActions: 'play none none reverse',
        ...options.scrollTrigger,
      },
    }
  );
}

/* ---- Stagger children ---- */
export function staggerUp(parent, childSelector = ':scope > *', options = {}) {
  return gsap.fromTo(
    parent.querySelectorAll(childSelector),
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: options.duration || 0.7,
      stagger: options.stagger || 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: parent,
        start: options.start || 'top 80%',
        toggleActions: 'play none none reverse',
        ...options.scrollTrigger,
      },
    }
  );
}

/* ---- Parallax background ---- */
export function parallax(element, options = {}) {
  return gsap.to(element, {
    yPercent: options.yPercent || -20,
    ease: 'none',
    scrollTrigger: {
      trigger: options.trigger || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: options.scrub || 1,
    },
  });
}

/* ---- Animated counter ---- */
export function animateCounter(element, endValue, options = {}) {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: endValue,
    duration: options.duration || 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    onUpdate() {
      element.textContent = Math.floor(obj.val).toLocaleString() + (options.suffix || '');
    },
  });
}

/* ---- Cleanup helper ---- */
export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}
