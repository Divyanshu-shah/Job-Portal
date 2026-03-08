/**
 * HowItWorks — 4-step scroll story with staggered GSAP entrance
 * and connecting progress line between steps.
 */
import { useEffect, useRef, lazy, Suspense } from 'react';
import { FaCloudUploadAlt, FaSearch, FaBullseye, FaPaperPlane } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LottiePlayer = lazy(() => import('lottie-react'));

const steps = [
  { icon: <FaCloudUploadAlt />, title: 'Upload Resume', description: 'Upload your resume in seconds. Our platform supports all major formats.', gradient: 'from-emerald-500 to-teal-500', lottie: null },
  { icon: <FaSearch />, title: 'Browse Opportunities', description: 'Search and filter thousands of jobs by role, location, salary, and experience level.', gradient: 'from-violet-500 to-indigo-500', lottie: null },
  { icon: <FaBullseye />, title: 'Get Job Matches', description: 'Receive personalized job recommendations that match your unique profile.', gradient: 'from-amber-500 to-orange-500', lottie: null },
  { icon: <FaPaperPlane />, title: 'Apply Instantly', description: 'Apply with one click. Your profile is auto-filled for faster applications.', gradient: 'from-rose-500 to-pink-500', lottie: null },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const stepsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Section heading */
      gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      });

      /* Progress line grows as you scroll */
      if (lineRef.current) {
        gsap.fromTo(lineRef.current, { scaleY: 0 }, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', end: 'bottom 60%', scrub: 1 },
        });
      }

      /* Stagger each step card */
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        const direction = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(el, { x: direction, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 relative" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'var(--glass-bg)', border: '1px solid var(--card-border)', color: 'var(--primary)' }}>
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
            Land Your Dream Job in <span className="gradient-text">4 Steps</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Our streamlined process gets you from resume upload to offer letter faster than ever.
          </p>
        </div>

        {/* Steps timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-emerald-500/20 via-violet-500/20 to-rose-500/20 hidden md:block">
            <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-emerald-500 via-violet-500 to-rose-500 origin-top" />
          </div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => (
              <div key={i} ref={(el) => (stepsRef.current[i] = el)} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Step card */}
                <div className="flex-1 w-full">
                  <div className="card p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
                    {/* Step number */}
                    <div className="absolute top-4 right-4 text-6xl font-extrabold opacity-[0.04]" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                      0{i + 1}
                    </div>
                    <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white text-xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 shrink-0 z-10 ring-4 ring-[var(--bg-secondary)]" />

                {/* Spacer for timeline alignment */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
