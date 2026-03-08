/**
 * ParallaxDivider — A full-width parallax background section
 * that moves slower than scroll, triggered via GSAP ScrollTrigger.
 */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxDivider = ({ children, className = '' }) => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${className}`} style={{ minHeight: '40vh' }}>
      <div ref={bgRef} className="absolute inset-0 -top-[20%] -bottom-[20%]">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-emerald-950/60 to-gray-950" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(5,150,105,0.4), transparent 60%), radial-gradient(circle at 70% 50%, rgba(99,102,241,0.3), transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-[40vh] px-4">
        {children}
      </div>
    </section>
  );
};

export default ParallaxDivider;
