/**
 * StatsSection — Animated counter stats with GSAP scroll-triggered counting.
 */
import { useEffect, useRef } from 'react';
import { FaBriefcase, FaStar, FaUserTie, FaChartLine } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 50000, suffix: '+', label: 'Students', icon: <FaUserTie />, gradient: 'from-violet-500 to-indigo-500' },
  { value: 10000, suffix: '+', label: 'Active Jobs', icon: <FaBriefcase />, gradient: 'from-amber-500 to-orange-500' },
  { value: 2000, suffix: '+', label: 'Companies', icon: <FaStar />, gradient: 'from-violet-500 to-indigo-500' },
  { value: 1000000, suffix: '+', label: 'Applications', icon: <FaChartLine />, gradient: 'from-rose-500 to-pink-500' },
];

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
};

const StatsSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const countersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Cards stagger in */
      gsap.fromTo(cardsRef.current, { y: 40, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });

      /* Counter animation */
      countersRef.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].value;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          onUpdate() {
            el.textContent = formatNumber(Math.floor(obj.val)) + stats[i].suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative" style={{ background: 'var(--bg-secondary)' }}>
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} ref={(el) => (cardsRef.current[i] = el)} className="stat-card text-center group relative overflow-hidden">
              {/* Hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />
              <div className={`w-12 h-12 mx-auto bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white text-lg mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div ref={(el) => (countersRef.current[i] = el)} className="text-3xl md:text-4xl font-extrabold mb-1 tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                0
              </div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
