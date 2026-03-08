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
    const tickerCallback = (time) => {
      const l = getLenis();
      if (l) l.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      destroySmoothScroll();
    };
  }, []);

  return children;
};

export default SmoothScroll;
