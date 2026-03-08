/**
 * SmoothScroll wrapper component.
 * Wraps the entire app to provide Lenis-based smooth scrolling.
 * Also syncs Lenis with GSAP ScrollTrigger for combined scroll animations.
 */
import { useEffect } from 'react';
import { initSmoothScroll, destroySmoothScroll, getLenis } from '../utils/smoothScroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = initSmoothScroll();

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      destroySmoothScroll();
    };
  }, []);

  return children;
};

export default SmoothScroll;
