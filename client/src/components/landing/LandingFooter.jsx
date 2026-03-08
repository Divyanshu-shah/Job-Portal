/**
 * LandingFooter — Modern footer with newsletter, scroll-triggered animations,
 * social icons, and clean layout.
 */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaHeart, FaArrowUp, FaPaperPlane } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { Icon: FaFacebook, label: 'Facebook' },
  { Icon: FaTwitter, label: 'Twitter' },
  { Icon: FaLinkedin, label: 'LinkedIn' },
  { Icon: FaInstagram, label: 'Instagram' },
  { Icon: FaGithub, label: 'GitHub' },
];

const LandingFooter = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current?.children || [], { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #111827 0%, #030712 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div ref={contentRef} className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 text-2xl font-bold text-white mb-5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-violet-500/30 transition-all duration-400">
                <FaBriefcase className="text-white text-lg" />
              </div>
              <span className="font-extrabold tracking-tight">JobPortal</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Connecting talented students with amazing opportunities. AI-powered job matching for the modern workforce.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-gray-500 text-sm outline-none focus:border-violet-500 transition-colors"
              />
              <button type="submit" className="px-4 py-2.5 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-xl text-white text-sm font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 flex items-center gap-1.5">
                <FaPaperPlane className="text-xs" /> {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">For Students</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/jobs" className="text-gray-400 hover:text-violet-400 transition-colors duration-300">Browse Jobs</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-violet-400 transition-colors duration-300">Create Account</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-violet-400 transition-colors duration-300">Student Login</Link></li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">For Recruiters</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/register" className="text-gray-400 hover:text-violet-400 transition-colors duration-300">Post a Job</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-violet-400 transition-colors duration-300">Recruiter Login</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ Icon, label }, i) => (
                <a key={i} href="#" aria-label={label} className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 border border-gray-800 hover:border-violet-500 hover:bg-violet-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500 flex items-center gap-1.5">Made with <FaHeart className="text-red-400 text-xs" /> for students</p>
            <button onClick={scrollToTop} className="w-9 h-9 rounded-xl border border-gray-800 flex items-center justify-center text-gray-400 hover:border-violet-500 hover:bg-violet-600 hover:text-white transition-all duration-300" aria-label="Scroll to top">
              <FaArrowUp className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
