import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applicationsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AnimatedSection from '../components/AnimatedSection';
import CountUp from '../components/CountUp';
import { FaBriefcase, FaFileAlt, FaCheckCircle, FaClock, FaTimesCircle, FaEye, FaArrowRight } from 'react-icons/fa';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        applied: 0,
        reviewed: 0,
        accepted: 0,
        rejected: 0
    });

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await applicationsAPI.getStudentApplications();
            setApplications(response.data);

            // Calculate stats
            const newStats = {
                total: response.data.length,
                applied: response.data.filter(a => a.status === 'Applied').length,
                reviewed: response.data.filter(a => a.status === 'Reviewed' || a.status === 'Shortlisted').length,
                accepted: response.data.filter(a => a.status === 'Accepted').length,
                rejected: response.data.filter(a => a.status === 'Rejected').length
            };
            setStats(newStats);
        } catch (err) {
            console.error('Failed to fetch applications:', err);
        }
        setLoading(false);
    };

    const getStatusBadge = (status) => {
        const styles = {
            'Applied': 'badge-applied',
            'Reviewed': 'badge-reviewed',
            'Shortlisted': 'badge-shortlisted',
            'Accepted': 'badge-accepted',
            'Rejected': 'badge-rejected'
        };
        return styles[status] || 'badge-applied';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'Applied': <FaClock className="text-blue-500" />,
            'Reviewed': <FaEye className="text-amber-500" />,
            'Shortlisted': <FaFileAlt className="text-purple-500" />,
            'Accepted': <FaCheckCircle className="text-emerald-500" />,
            'Rejected': <FaTimesCircle className="text-red-500" />
        };
        return icons[status] || <FaClock className="text-blue-500" />;
    };

    const getGradient = (char) => {
        const gradients = [
            'from-emerald-500 to-teal-600',
            'from-amber-500 to-orange-600',
            'from-sky-500 to-blue-600',
            'from-rose-500 to-pink-600',
            'from-amber-500 to-orange-600',
            'from-violet-500 to-fuchsia-600',
        ];
        const idx = (char?.charCodeAt(0) || 0) % gradients.length;
        return gradients[idx];
    };

    const statItems = [
        { value: stats.total, label: 'Total Applications', color: '', icon: <FaBriefcase className="text-3xl text-emerald-300" /> },
        { value: stats.applied, label: 'Applied', color: 'text-blue-500', icon: <FaClock className="text-3xl text-blue-300" /> },
        { value: stats.reviewed, label: 'In Review', color: 'text-amber-500', icon: <FaEye className="text-3xl text-amber-300" /> },
        { value: stats.accepted, label: 'Accepted', color: 'text-emerald-500', icon: <FaCheckCircle className="text-3xl text-emerald-300" /> },
        { value: stats.rejected, label: 'Rejected', color: 'text-red-500', icon: <FaTimesCircle className="text-3xl text-red-300" /> },
    ];

    return (
        <div className="page-container min-h-screen" style={{ background: 'var(--bg-tertiary)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Header */}
                <AnimatedSection animation="blur-in" className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                        Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>!
                    </h1>
                    <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Track your job applications and find new opportunities.</p>
                </AnimatedSection>

                {/* Stats Cards */}
                <AnimatedSection animation="fade-in-up" stagger className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    {statItems.map((item, index) => (
                        <div key={index} className="stat-card card-tilt">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`stat-card-value ${item.color}`}>{item.value}</p>
                                    <p className="stat-card-label">{item.label}</p>
                                </div>
                                {item.icon}
                            </div>
                        </div>
                    ))}
                </AnimatedSection>

                {/* Quick Actions */}
                <AnimatedSection animation="slide-in-left" delay={300} className="flex flex-wrap gap-4 mb-8">
                    <Link to="/jobs" className="btn btn-primary btn-ripple flex items-center gap-2">
                        Browse Jobs <FaArrowRight className="text-sm" />
                    </Link>
                </AnimatedSection>

                {/* Applications List */}
                <AnimatedSection animation="tilt-in" delay={400}>
                    <div className="card">
                        <div className="p-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>My Applications</h2>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="spinner"></div>
                            </div>
                        ) : applications.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center float" style={{ background: 'var(--bg-tertiary)' }}>
                                    <FaBriefcase className="text-3xl" style={{ color: 'var(--text-muted)' }} />
                                </div>
                                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No Applications Yet</h3>
                                <p className="mb-5" style={{ color: 'var(--text-secondary)' }}>Start applying to jobs to see them here.</p>
                                <Link to="/jobs" className="btn btn-primary">
                                    Browse Jobs
                                </Link>
                            </div>
                        ) : (
                            <div>
                                {applications.map((application, index) => (
                                    <div
                                        key={application._id}
                                        className="p-6 transition-all duration-300 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10"
                                        style={{ borderBottom: index < applications.length - 1 ? '1px solid var(--border-color)' : 'none' }}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 bg-gradient-to-br ${getGradient(application.job?.company)} rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg`}>
                                                    {application.job?.company?.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>
                                                        <Link to={`/jobs/${application.job?._id}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                                            {application.job?.title}
                                                        </Link>
                                                    </h3>
                                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{application.job?.company} • {application.job?.location}</p>
                                                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                                                        Applied on {new Date(application.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {getStatusIcon(application.status)}
                                                <span className={`badge ${getStatusBadge(application.status)}`}>
                                                    {application.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </AnimatedSection>
            </div>
        </div >
    );
};

export default StudentDashboard;
