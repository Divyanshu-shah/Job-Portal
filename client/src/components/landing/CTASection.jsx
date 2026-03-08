/**
 * CTASection — Strong call-to-action with Framer Motion hover glow,
 * GSAP parallax background, and entrance animations.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCloudUploadAlt } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Framer Motion glow button variant */
const glowVariant = {
  rest: { boxShadow: '0 0 0 0 rgba(124, 58, 237, 0)' },
  hover: { boxShadow: '0 0 30px 8px rgba(124, 58, 237, 0.35)', transition: { duration: 0.4 } },
};

const CTASection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Content entrance */
      gsap.fromTo(contentRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });

      /* Parallax blobs */
      [bg1Ref.current, bg2Ref.current].forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          yPercent: i === 0 ? -30 : 30,
          xPercent: i === 0 ? 10 : -10,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #111827 0%, #2e1065 50%, #111827 100%)' }}>
      {/* Animated background blobs */}
      <div ref={bg1Ref} className="absolute top-10 left-10 w-80 h-80 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div ref={bg2Ref} className="absolute bottom-10 right-10 w-80 h-80 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div ref={contentRef} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Your Dream Job is <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-violet-300 via-indigo-200 to-rose-300 bg-clip-text text-transparent">Waiting</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Join thousands of students and recruiters who have found their perfect match through JobPortal. Your next chapter starts here.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div variants={glowVariant} initial="rest" whileHover="hover" className="rounded-xl">
            <Link to="/register" className="btn btn-primary btn-ripple text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center gap-2">
              Get Started <FaArrowRight />
            </Link>
          </motion.div>
          <motion.div variants={glowVariant} initial="rest" whileHover="hover" className="rounded-xl">
            <Link to="/register" className="btn border-2 border-white/20 text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center gap-2 transition-all duration-300">
              <FaCloudUploadAlt /> Upload Resume
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
