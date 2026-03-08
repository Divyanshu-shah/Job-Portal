import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setError(''); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const result = await login(formData);
        if (result.success) {
            const dashboardRoutes = { student: '/student/dashboard', recruiter: '/recruiter/dashboard', admin: '/admin/dashboard' };
            navigate(dashboardRoutes[result.user.role] || from, { replace: true });
        } else { setError(result.error); }
        setLoading(false);
    };

    return (
        <div className="page-container min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
            <div className="w-full max-w-md mx-4 fade-in-up">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2.5 text-3xl font-bold group">
                        <span className="gradient-text font-extrabold tracking-tight">JobPortal</span>
                    </Link>
                    <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>Welcome back! Please login to continue.</p>
                </div>
                <div className="card p-5 sm:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>Sign In</h2>
                    {error && <div className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="Enter your email" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" placeholder="Enter your password" required />
                        </div>
                        <button type="submit" disabled={loading} className="w-full btn btn-primary btn-ripple flex items-center justify-center gap-2 py-3.5">
                            {loading ? <div className="spinner w-5 h-5 border-2"></div> : 'Sign In'}
                        </button>
                    </form>
                    <div className="mt-8 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Don&apos;t have an account?{' '}
                        <Link to="/register" className="text-violet-600 dark:text-violet-400 font-bold hover:text-violet-700 dark:hover:text-violet-300 transition-colors">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
