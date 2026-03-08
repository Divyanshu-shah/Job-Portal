/**
 * AISection — Showcase AI-powered features with Lottie animation,
 * animated progress bars, and scroll-triggered entrance.
 */
import { useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaBrain, FaCheckCircle } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const LottiePlayer = lazy(() => import('lottie-react'));

const features = [
  { label: 'Resume Parsing', value: 95 },
  { label: 'Skill Matching', value: 92 },
  { label: 'Job Compatibility', value: 88 },
];

const bullets = [
  'Instant resume analysis powered by AI',
  'Smart skill extraction and categorization',
  'Personalized job matching score',
  'Auto-fill applications from your profile',
];

const AISection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Slide content from left */
      gsap.fromTo(contentRef.current, { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });

      /* Slide visual from right */
      gsap.fromTo(visualRef.current, { x: 60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });

      /* Animate progress bars */
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        gsap.fromTo(bar, { width: '0%' }, {
          width: `${features[i].value}%`, duration: 1.2, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
      {/* Decorative bg blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div ref={contentRef}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6" style={{ background: 'var(--glass-bg)', border: '1px solid var(--card-border)', color: 'var(--primary)' }}>
              <FaBrain className="text-xs" /> AI-Powered
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
              AI Resume <span className="gradient-text">Analyzer</span>
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Our cutting-edge AI analyzes your resume against thousands of job listings to find your perfect match with unprecedented accuracy.
            </p>

            {/* Bullet points */}
            <ul className="space-y-4 mb-10">
              {bullets.map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-base" style={{ color: 'var(--text-secondary)' }}>
                  <FaCheckCircle className="text-emerald-500 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>

            {/* Progress bars */}
            <div className="space-y-5">
              {features.map((feat, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{feat.label}</span>
                    <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>{feat.value}%</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                    <div ref={(el) => (barsRef.current[i] = el)} className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: 0 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Lottie visual */}
          <div ref={visualRef} className="flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-violet-500/10 rounded-3xl blur-2xl" />
              <div className="relative card p-8 flex items-center justify-center h-full">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="spinner" /></div>}>
                  <LottiePlayer
                    path="/animations/ai-scan.json"
                    loop
                    autoplay
                    className="w-full h-full"
                    rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
