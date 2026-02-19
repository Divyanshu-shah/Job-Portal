import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaBriefcase, FaBuilding, FaPhone } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'student', company: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setError(''); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return; }
        if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return; }
        if (formData.role === 'recruiter' && !formData.company) { setError('Company name is required for recruiters'); return; }
        setLoading(true);
        const result = await register({ name: formData.name, email: formData.email, password: formData.password, role: formData.role, company: formData.company, phone: formData.phone });
        if (result.success) {
            if (result.user.role === 'recruiter' && !result.user.isApproved) { navigate('/recruiter/pending'); }
            else { const routes = { student: '/student/dashboard', recruiter: '/recruiter/dashboard', admin: '/admin/dashboard' }; navigate(routes[result.user.role]); }
        } else { setError(result.error); }
        setLoading(false);
    };

    return (
        <div className="page-container min-h-screen flex items-center justify-center py-12" style={{ background: 'var(--bg-primary)' }}>
            <div className="w-full max-w-md mx-4 fade-in-up">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2.5 text-3xl font-bold group">
                        <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-400">
                            <FaBriefcase className="text-xl" />
                        </div>
                        <span className="gradient-text font-extrabold tracking-tight">JobPortal</span>
                    </Link>
                    <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>Create your account to get started.</p>
                </div>
                <div className="card p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>Create Account</h2>
                    {error && <div className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>I am a...</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" onClick={() => setFormData({ ...formData, role: 'student' })}
                                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2.5 transition-all duration-300 ${formData.role === 'student' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shadow-md shadow-emerald-500/10' : 'hover:border-gray-300 dark:hover:border-gray-500'}`}
                                    style={formData.role !== 'student' ? { borderColor: 'var(--input-border)', color: 'var(--text-secondary)' } : {}}>
                                    <FaUser className="text-2xl" /><span className="font-bold text-sm">Student</span>
                                </button>
                                <button type="button" onClick={() => setFormData({ ...formData, role: 'recruiter' })}
                                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2.5 transition-all duration-300 ${formData.role === 'recruiter' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shadow-md shadow-emerald-500/10' : 'hover:border-gray-300 dark:hover:border-gray-500'}`}
                                    style={formData.role !== 'recruiter' ? { borderColor: 'var(--input-border)', color: 'var(--text-secondary)' } : {}}>
                                    <FaBuilding className="text-2xl" /><span className="font-bold text-sm">Recruiter</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Full Name</label>
                            <div className="relative"><FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }} />
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field pl-11" placeholder="Enter your full name" required /></div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Email Address</label>
                            <div className="relative"><FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }} />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field pl-11" placeholder="Enter your email" required /></div>
                        </div>
                        {formData.role === 'recruiter' && (
                            <div className="fade-in">
                                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Company Name</label>
                                <div className="relative"><FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }} />
                                    <input type="text" name="company" value={formData.company} onChange={handleChange} className="input-field pl-11" placeholder="Enter your company name" required /></div>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Phone Number (Optional)</label>
                            <div className="relative"><FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }} />
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field pl-11" placeholder="Enter your phone number" /></div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Password</label>
                            <div className="relative"><FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }} />
                                <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field pl-11" placeholder="Create a password" required /></div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Confirm Password</label>
                            <div className="relative"><FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }} />
                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input-field pl-11" placeholder="Confirm your password" required /></div>
                        </div>
                        {formData.role === 'recruiter' && (
                            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl text-amber-700 dark:text-amber-400 text-sm font-medium fade-in">
                                <strong>Note:</strong> Recruiter accounts require admin approval before you can post jobs.
                            </div>
                        )}
                        <button type="submit" disabled={loading} className="w-full btn btn-primary flex items-center justify-center gap-2 py-3.5">
                            {loading ? <div className="spinner w-5 h-5 border-2"></div> : <><FaUserPlus /> Create Account</>}
                        </button>
                    </form>
                    <div className="mt-8 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Already have an account?{' '}
                        <Link to="/login" className="text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
