/**
 * Hero Section — Full-screen hero with GSAP entrance animations,
 * floating background icons, gradient overlay, and parallax effect.
 */
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowRight, FaStar, FaBriefcase, FaUserTie, FaRocket, FaChartLine, FaCode, FaPaintBrush, FaDatabase } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Floating background icons config */
const floatingIcons = [
  { Icon: FaBriefcase, x: '10%', y: '20%', size: 'text-2xl', delay: 0 },
  { Icon: FaCode, x: '85%', y: '15%', size: 'text-3xl', delay: 0.5 },
  { Icon: FaPaintBrush, x: '75%', y: '70%', size: 'text-xl', delay: 1 },
  { Icon: FaDatabase, x: '15%', y: '75%', size: 'text-2xl', delay: 1.5 },
  { Icon: FaRocket, x: '50%', y: '10%', size: 'text-xl', delay: 0.8 },
  { Icon: FaChartLine, x: '90%', y: '45%', size: 'text-2xl', delay: 1.2 },
];

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const searchRef = useRef(null);
  const badgeRef = useRef(null);
  const linksRef = useRef(null);
  const iconsRef = useRef([]);
  const bgRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search')?.toString().trim();
    if (query) {
      navigate(`/jobs?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/jobs');
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      /* Entrance sequence */
      tl.fromTo(badgeRef.current, { y: -20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6 })
        .fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.3')
        .fromTo(subtitleRef.current, { y: 40, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 }, '-=0.5')
        .fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .fromTo(searchRef.current, { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8 }, '-=0.3')
        .fromTo(linksRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');

      /* Floating icons — continuous gentle animation */
      iconsRef.current.forEach((icon, i) => {
        if (!icon) return;
        gsap.fromTo(icon, { opacity: 0, scale: 0 }, { opacity: 0.15, scale: 1, duration: 0.8, delay: floatingIcons[i].delay, ease: 'back.out(1.7)' });
        gsap.to(icon, { y: 'random(-20, 20)', x: 'random(-10, 10)', rotation: 'random(-15, 15)', duration: 'random(3, 5)', repeat: -1, yoyo: true, ease: 'sine.inOut', delay: floatingIcons[i].delay });
      });

      /* Parallax effect on background */
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section relative min-h-[calc(100svh-4rem)] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div ref={bgRef} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-violet-950/80 to-gray-950" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 40%, rgba(124,58,237,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(99,102,241,0.25) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(225,29,72,0.2) 0%, transparent 40%)' }} />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, size }, i) => (
        <div key={i} ref={(el) => (iconsRef.current[i] = el)} className={`absolute text-white/10 ${size} pointer-events-none`} style={{ left: x, top: y }}>
          <Icon />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-10 sm:py-20">
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/10 text-violet-300 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
          <FaStar className="text-amber-400 text-xs" />
          <span>Trusted by 50,000+ students nationwide</span>
        </div>

        <h1 ref={titleRef} className="text-[1.75rem] sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-white mb-3 sm:mb-4 leading-[1.1] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Find Your Dream Job
        </h1>

        <h2 ref={subtitleRef} className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-violet-300 via-indigo-200 to-rose-300 bg-clip-text text-transparent" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Start Your Career Today
        </h2>

        <p ref={descRef} className="text-sm sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-12 leading-relaxed px-2 sm:px-0">
          Connect with top employers, discover amazing opportunities, and take the next step in your professional journey.
        </p>

        {/* Search Bar */}
        <form ref={searchRef} onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="hero-search-bar rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-3 px-5 py-3.5 bg-white/[0.06] rounded-xl border border-white/[0.08]">
              <FaSearch className="text-gray-500" />
              <input name="search" type="text" placeholder="Job title, keywords, or company" className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-base" />
            </div>
            <button type="submit" className="hero-cta-btn flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl font-semibold text-white transition-all duration-300">
              Search Jobs <FaArrowRight className="text-sm" />
            </button>
          </div>
        </form>

        <div ref={linksRef} className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
          <Link to="/register" className="text-gray-500 hover:text-violet-300 transition-colors duration-300 flex items-center gap-2 text-sm">
            <FaUserTie /> For Students
          </Link>
          <span className="text-gray-700">|</span>
          <Link to="/register" className="text-gray-500 hover:text-violet-300 transition-colors duration-300 flex items-center gap-2 text-sm">
            <FaBriefcase /> For Recruiters
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-[var(--bg-tertiary)] to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;
