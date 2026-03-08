/**
 * FeaturedJobs — Showcase animated job cards with Framer Motion hover
 * effects and GSAP scroll-triggered entrance animations.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaArrowRight } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Sample featured jobs — shown on landing page */
const sampleJobs = [
  { id: 1, title: 'Senior React Developer', company: 'TechCorp', location: 'San Francisco, CA', salary: '$120K–$160K', type: 'Full-time', gradient: 'from-violet-500 to-indigo-600' },
  { id: 2, title: 'Product Designer', company: 'DesignLab', location: 'New York, NY', salary: '$95K–$130K', type: 'Remote', gradient: 'from-violet-500 to-indigo-600' },
  { id: 3, title: 'Data Scientist', company: 'DataFlow', location: 'Austin, TX', salary: '$110K–$150K', type: 'Full-time', gradient: 'from-amber-500 to-orange-600' },
  { id: 4, title: 'DevOps Engineer', company: 'CloudBase', location: 'Seattle, WA', salary: '$130K–$170K', type: 'Contract', gradient: 'from-rose-500 to-pink-600' },
  { id: 5, title: 'ML Engineer', company: 'NeuralTech', location: 'Boston, MA', salary: '$140K–$180K', type: 'Full-time', gradient: 'from-sky-500 to-blue-600' },
  { id: 6, title: 'Full Stack Developer', company: 'BuildCo', location: 'Remote', salary: '$100K–$140K', type: 'Remote', gradient: 'from-lime-500 to-green-600' },
];

/* Framer Motion hover card variant */
const cardVariants = {
  rest: { scale: 1, y: 0, boxShadow: 'var(--card-shadow)' },
  hover: { scale: 1.02, y: -6, boxShadow: '0 25px 50px -12px rgba(124, 58, 237, 0.15), 0 8px 24px rgba(0,0,0,0.08)', transition: { duration: 0.3, ease: 'easeOut' } },
};

const FeaturedJobs = () => {
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
        gsap.fromTo(gridRef.current.children, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-28" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'var(--glass-bg)', border: '1px solid var(--card-border)', color: 'var(--primary)' }}>
            <FaBriefcase className="text-xs" /> Featured Jobs
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
            Hot Opportunities <span className="gradient-text">Right Now</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Top companies are hiring. Don't miss out on these featured positions.
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sampleJobs.map((job) => (
            <motion.div key={job.id} variants={cardVariants} initial="rest" whileHover="hover" className="card p-4 sm:p-6 cursor-pointer group">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${job.gradient} rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg shrink-0`}>
                  {job.company.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                    {job.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{job.company}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-violet-500 text-xs" /> {job.location}</span>
                <span className="flex items-center gap-1"><FaDollarSign className="text-violet-500 text-xs" /> {job.salary}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="badge bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">{job.type}</span>
                <Link to="/jobs" className="text-sm font-medium text-violet-600 dark:text-violet-400 flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  View <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/jobs" className="btn btn-primary btn-ripple inline-flex items-center gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
            View All Jobs <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
