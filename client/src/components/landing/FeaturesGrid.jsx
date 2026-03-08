/**
 * FeaturesGrid — Premium feature cards section with GSAP scroll entrance
 * and Framer Motion hover interactions (replaces old Features section).
 */
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaUserTie, FaRocket, FaChartLine, FaShieldAlt, FaBolt } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: <FaBriefcase />, title: 'Find Dream Jobs', description: 'Browse thousands of job listings from top companies and find the perfect match for your skills.', gradient: 'from-violet-500 to-indigo-500' },
  { icon: <FaUserTie />, title: 'Connect with Recruiters', description: 'Direct access to hiring managers and recruiters looking for talented individuals like you.', gradient: 'from-amber-500 to-orange-500' },
  { icon: <FaRocket />, title: 'Quick Applications', description: 'Apply to multiple jobs with just a few clicks. Upload your resume once and use it everywhere.', gradient: 'from-sky-500 to-blue-500' },
  { icon: <FaChartLine />, title: 'Track Progress', description: 'Monitor your application status in real-time. Never miss an update on your job applications.', gradient: 'from-rose-500 to-pink-500' },
  { icon: <FaShieldAlt />, title: 'Verified Companies', description: 'Every recruiter is vetted and approved. Your data is safe with enterprise-grade security.', gradient: 'from-violet-500 to-indigo-500' },
  { icon: <FaBolt />, title: 'Instant Notifications', description: 'Get notified the moment your application status changes or a new matching job appears.', gradient: 'from-lime-500 to-green-500' },
];

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -8, transition: { duration: 0.3, ease: 'easeOut' } },
};

const FeaturesGrid = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      });

      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children, { y: 50, opacity: 0, scale: 0.95 }, {
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-28" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'var(--glass-bg)', border: '1px solid var(--card-border)', color: 'var(--primary)' }}>
            <FaRocket className="text-xs" /> Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-5 tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
            Why Choose <span className="gradient-text">JobPortal</span>?
          </h2>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--text-secondary)' }}>
            We provide the best platform for job seekers and recruiters to connect and find the perfect match.
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feat, i) => (
            <motion.div key={i} variants={cardHover} initial="rest" whileHover="hover" className="card p-7 group hover:border-violet-500/30 cursor-default">
              <div className={`w-14 h-14 bg-gradient-to-br ${feat.gradient} rounded-2xl flex items-center justify-center text-white text-xl mb-5 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{feat.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
