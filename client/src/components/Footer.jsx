import { Link } from 'react-router-dom';
import { FaBriefcase, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #111827 0%, #030712 100%)' }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-40"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-4 gap-10">
                    <div className="col-span-1">
                        <Link to="/" className="flex items-center gap-2.5 text-2xl font-bold text-white mb-5 group">
                            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-400">
                                <FaBriefcase className="text-white text-lg" />
                            </div>
                            <span className="font-extrabold tracking-tight">JobPortal</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">Connecting talented students with amazing opportunities. Find your dream job today!</p>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">For Students</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/jobs" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 inline-block">Browse Jobs</Link></li>
                            <li><Link to="/register" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 inline-block">Create Account</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 inline-block">Student Login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">For Recruiters</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/register" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 inline-block">Post a Job</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 inline-block">Recruiter Login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Connect</h3>
                        <div className="flex gap-3">
                            {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 border border-gray-700 hover:border-emerald-500 hover:bg-emerald-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-14 pt-8 border-t border-gray-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">© 2026 JobPortal. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-500 flex items-center gap-1.5">Made with <FaHeart className="text-red-400 text-xs" /> for students</p>
                        <button onClick={scrollToTop} className="w-9 h-9 rounded-xl border border-gray-700 flex items-center justify-center text-gray-400 hover:border-emerald-500 hover:bg-emerald-600 hover:text-white transition-all duration-300" aria-label="Scroll to top">
                            <FaArrowUp className="text-sm" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
