import { Link } from 'react-router-dom';
import { FaBriefcase, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
                            <FaBriefcase className="text-indigo-400" />
                            JobPortal
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Connecting talented students with amazing opportunities. Find your dream job today!
                        </p>
                    </div>

                    {/* For Students */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">For Students</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/jobs" className="hover:text-indigo-400 transition-colors">Browse Jobs</Link></li>
                            <li><Link to="/register" className="hover:text-indigo-400 transition-colors">Create Account</Link></li>
                            <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Student Login</Link></li>
                        </ul>
                    </div>

                    {/* For Recruiters */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">For Recruiters</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/register" className="hover:text-indigo-400 transition-colors">Post a Job</Link></li>
                            <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Recruiter Login</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Connect</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                <FaFacebook />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                <FaLinkedin />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © 2026 JobPortal. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        Made with <FaHeart className="text-red-500" /> for students
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
