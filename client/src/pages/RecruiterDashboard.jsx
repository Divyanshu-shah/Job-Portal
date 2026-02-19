import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsAPI, applicationsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AnimatedSection from '../components/AnimatedSection';
import { FaBriefcase, FaUsers, FaPlus, FaTrash, FaEye, FaTimes, FaClock, FaCheckCircle, FaTimesCircle, FaFileAlt, FaArrowRight } from 'react-icons/fa';

const RecruiterDashboard = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applications, setApplications] = useState([]);
    const [appLoading, setAppLoading] = useState(false);

    useEffect(() => {
        if (user?.isApproved) {
            fetchJobs();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchJobs = async () => {
        try {
            const response = await jobsAPI.getRecruiterJobs();
            setJobs(response.data);
        } catch (err) {
            console.error('Failed to fetch jobs:', err);
        }
        setLoading(false);
    };

    const fetchApplications = async (jobId) => {
        setAppLoading(true);
        try {
            const response = await applicationsAPI.getJobApplications(jobId);
            setApplications(response.data);
            setSelectedJob(jobId);
        } catch (err) {
            console.error('Failed to fetch applications:', err);
        }
        setAppLoading(false);
    };

    const updateApplicationStatus = async (applicationId, status) => {
        try {
            await applicationsAPI.updateStatus(applicationId, status);
            setApplications(applications.map(app =>
                app._id === applicationId ? { ...app, status } : app
            ));
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const deleteJob = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await jobsAPI.delete(jobId);
                setJobs(jobs.filter(j => j._id !== jobId));
                if (selectedJob === jobId) {
                    setSelectedJob(null);
                    setApplications([]);
                }
            } catch (err) {
                console.error('Failed to delete job:', err);
            }
        }
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
            'Applied': <FaClock className="text-blue-500 text-sm" />,
            'Reviewed': <FaEye className="text-amber-500 text-sm" />,
            'Shortlisted': <FaFileAlt className="text-purple-500 text-sm" />,
            'Accepted': <FaCheckCircle className="text-emerald-500 text-sm" />,
            'Rejected': <FaTimesCircle className="text-red-500 text-sm" />
        };
        return icons[status] || <FaClock className="text-blue-500 text-sm" />;
    };

    // Pending approval screen
    if (!user?.isApproved) {
        return (
            <div className="page-container min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                <div className="card max-w-lg mx-4 p-12 text-center scale-in">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center text-white shadow-xl float glow-ring">
                        <FaClock className="text-3xl" />
                    </div>
                    <h2 className="text-2xl font-extrabold mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>Pending Approval</h2>
                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                        Your recruiter account is under review. You'll be able to post jobs once an admin approves your account.
                    </p>
                </div>
            </div>
        );
    }

    const totalApplications = jobs.reduce((sum, job) => sum + (job.applicationCount || 0), 0);

    const statItems = [
        { value: jobs.length, label: 'Total Jobs', icon: <FaBriefcase className="text-3xl text-emerald-300" /> },
        { value: totalApplications, label: 'Applications', icon: <FaUsers className="text-3xl text-cyan-300" /> },
    ];

    return (
        <div className="page-container min-h-screen" style={{ background: 'var(--bg-tertiary)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Header */}
                <AnimatedSection animation="blur-in" className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                        Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>!
                    </h1>
                    <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Manage your job postings and track applications.</p>
                </AnimatedSection>

                {/* Stats */}
                <AnimatedSection animation="fade-in-up" stagger className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
                    {statItems.map((item, index) => (
                        <div key={index} className="stat-card card-tilt">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="stat-card-value">{item.value}</p>
                                    <p className="stat-card-label">{item.label}</p>
                                </div>
                                {item.icon}
                            </div>
                        </div>
                    ))}
                </AnimatedSection>

                {/* Post Job CTA */}
                <AnimatedSection animation="slide-in-left" delay={200} className="flex flex-wrap gap-4 mb-8">
                    <Link to="/recruiter/post-job" className="btn btn-primary btn-ripple flex items-center gap-2">
                        <FaPlus /> Post New Job
                    </Link>
                </AnimatedSection>

                {/* Jobs List */}
                <AnimatedSection animation="tilt-in" delay={300}>
                    <div className="card mb-6">
                        <div className="p-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>Your Job Postings</h2>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="spinner"></div>
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center float" style={{ background: 'var(--bg-tertiary)' }}>
                                    <FaBriefcase className="text-3xl" style={{ color: 'var(--text-muted)' }} />
                                </div>
                                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No Jobs Posted Yet</h3>
                                <p className="mb-5" style={{ color: 'var(--text-secondary)' }}>Create your first job listing.</p>
                                <Link to="/recruiter/post-job" className="btn btn-primary">
                                    Post a Job
                                </Link>
                            </div>
                        ) : (
                            <div>
                                {jobs.map((job, index) => (
                                    <div
                                        key={job._id}
                                        className={`p-6 transition-all duration-300 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 ${selectedJob === job._id ? 'bg-emerald-50/40 dark:bg-emerald-900/15' : ''}`}
                                        style={{ borderBottom: index < jobs.length - 1 ? '1px solid var(--border-color)' : 'none' }}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{job.title}</h3>
                                                <div className="flex flex-wrap gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                                                    <span>{job.location}</span>
                                                    <span>•</span>
                                                    <span className="capitalize">{job.jobType?.replace('-', ' ')}</span>
                                                    <span>•</span>
                                                    <span>{job.applicationCount || 0} applicants</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => fetchApplications(job._id)}
                                                    className="btn btn-outline text-sm py-2 px-4 flex items-center gap-2"
                                                >
                                                    <FaEye /> View Applications
                                                </button>
                                                <button
                                                    onClick={() => deleteJob(job._id)}
                                                    className="btn btn-danger text-sm py-2 px-4 flex items-center gap-2"
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </AnimatedSection>

                {/* Applications Modal */}
                {selectedJob && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'var(--modal-overlay)' }}>
                        <div className="card max-w-3xl w-full max-h-[85vh] overflow-y-auto fade-in-up" style={{ background: 'var(--bg-secondary)' }}>
                            <div className="sticky top-0 p-6 flex items-center justify-between" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', zIndex: 10 }}>
                                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                                    Applications ({applications.length})
                                </h2>
                                <button
                                    onClick={() => { setSelectedJob(null); setApplications([]); }}
                                    className="p-2 rounded-xl transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {appLoading ? (
                                <div className="flex justify-center py-12">
                                    <div className="spinner"></div>
                                </div>
                            ) : applications.length === 0 ? (
                                <div className="text-center py-16">
                                    <p style={{ color: 'var(--text-secondary)' }}>No applications yet for this job.</p>
                                </div>
                            ) : (
                                <div className="p-6 space-y-4">
                                    {applications.map((app) => (
                                        <div key={app._id} className="p-4 rounded-xl border transition-all duration-300 hover:shadow-md"
                                            style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                                        {app.student?.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{app.student?.name}</p>
                                                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{app.student?.email}</p>
                                                        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                                                            Applied: {new Date(app.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1.5">
                                                        {getStatusIcon(app.status)}
                                                        <span className={`badge ${getStatusBadge(app.status)}`}>
                                                            {app.status}
                                                        </span>
                                                    </div>
                                                    <select
                                                        value={app.status}
                                                        onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                                                        className="input-field text-sm py-1.5 px-3"
                                                    >
                                                        <option value="Applied">Applied</option>
                                                        <option value="Reviewed">Reviewed</option>
                                                        <option value="Shortlisted">Shortlisted</option>
                                                        <option value="Accepted">Accepted</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {app.coverLetter && (
                                                <div className="mt-3 p-4 rounded-xl text-sm" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                                                    <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Cover Letter</p>
                                                    {app.coverLetter}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecruiterDashboard;
