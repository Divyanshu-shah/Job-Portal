import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaBriefcase, FaBars, FaTimes, FaUser, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
        setDropdownOpen(false);
    };

    const getDashboardLink = () => {
        if (!user) return '/';
        const routes = {
            student: '/student/dashboard',
            recruiter: '/recruiter/dashboard',
            admin: '/admin/dashboard'
        };
        return routes[user.role] || '/';
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 backdrop-blur-sm shadow-md z-50" style={{ backgroundColor: 'var(--nav-bg)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        <FaBriefcase className="text-3xl" />
                        <span className="gradient-text">JobPortal</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link
                            to="/"
                            className={`nav-link ${isActive('/') ? 'active' : ''}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            className={`nav-link ${isActive('/jobs') ? 'active' : ''}`}
                        >
                            Browse Jobs
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to={getDashboardLink()}
                                    className={`nav-link ${location.pathname.includes('dashboard') ? 'active' : ''}`}
                                >
                                    Dashboard
                                </Link>

                                {/* User Dropdown */}
                                <div className="relative ml-4">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors"
                                        style={{ backgroundColor: 'var(--bg-tertiary)' }}
                                    >
                                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <span style={{ color: 'var(--text-primary)' }} className="font-medium">{user?.name?.split(' ')[0]}</span>
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl py-2 fade-in" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderWidth: '1px' }}>
                                            <div className="px-4 py-2" style={{ borderBottomColor: 'var(--border-color)', borderBottomWidth: '1px' }}>
                                                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{user?.name}</p>
                                                <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{user?.role}</p>
                                            </div>
                                            <Link
                                                to={getDashboardLink()}
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2 hover:opacity-80"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                <FaUser style={{ color: 'var(--text-muted)' }} />
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <FaSignOutAlt className="text-red-400" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-3 ml-4">
                                <Link to="/login" className="btn btn-outline text-sm py-2">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary text-sm py-2">
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle ml-4"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <FaSun className="text-xl text-yellow-500" />
                            ) : (
                                <FaMoon className="text-xl text-indigo-600" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        {/* Theme Toggle Mobile */}
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <FaSun className="text-lg text-yellow-500" />
                            ) : (
                                <FaMoon className="text-lg text-indigo-600" />
                            )}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden fade-in" style={{ backgroundColor: 'var(--card-bg)', borderTopColor: 'var(--border-color)', borderTopWidth: '1px' }}>
                    <div className="px-4 py-4 space-y-2">
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 rounded-lg"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 rounded-lg"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Browse Jobs
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to={getDashboardLink()}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-2 rounded-lg"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="block w-full text-left px-4 py-2 rounded-lg text-red-500"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="pt-4 space-y-2">
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-center btn btn-outline"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-center btn btn-primary"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
