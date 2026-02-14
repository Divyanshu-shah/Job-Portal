import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applicationsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaBriefcase, FaFileAlt, FaCheckCircle, FaClock, FaTimesCircle, FaEye } from 'react-icons/fa';

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
            'Reviewed': <FaEye className="text-yellow-500" />,
            'Shortlisted': <FaFileAlt className="text-purple-500" />,
            'Accepted': <FaCheckCircle className="text-green-500" />,
            'Rejected': <FaTimesCircle className="text-red-500" />
        };
        return icons[status] || <FaClock className="text-blue-500" />;
    };

    return (
        <div className="page-container bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>!
                    </h1>
                    <p className="text-gray-600 mt-2">Track your job applications and find new opportunities.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-card-value">{stats.total}</p>
                                <p className="stat-card-label">Total Applications</p>
                            </div>
                            <FaBriefcase className="text-3xl text-indigo-200" />
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-card-value text-blue-600">{stats.applied}</p>
                                <p className="stat-card-label">Applied</p>
                            </div>
                            <FaClock className="text-3xl text-blue-200" />
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-card-value text-yellow-600">{stats.reviewed}</p>
                                <p className="stat-card-label">In Review</p>
                            </div>
                            <FaEye className="text-3xl text-yellow-200" />
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-card-value text-green-600">{stats.accepted}</p>
                                <p className="stat-card-label">Accepted</p>
                            </div>
                            <FaCheckCircle className="text-3xl text-green-200" />
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-card-value text-red-600">{stats.rejected}</p>
                                <p className="stat-card-label">Rejected</p>
                            </div>
                            <FaTimesCircle className="text-3xl text-red-200" />
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <Link to="/jobs" className="btn btn-primary">
                        Browse Jobs
                    </Link>
                </div>

                {/* Applications List */}
                <div className="card">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900">My Applications</h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="spinner"></div>
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="text-center py-12">
                            <FaBriefcase className="text-5xl text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-700 mb-2">No Applications Yet</h3>
                            <p className="text-gray-500 mb-4">Start applying to jobs to see them here.</p>
                            <Link to="/jobs" className="btn btn-primary">
                                Browse Jobs
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {applications.map((application) => (
                                <div key={application._id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                                                {application.job?.company?.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    <Link to={`/jobs/${application.job?._id}`} className="hover:text-indigo-600">
                                                        {application.job?.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-gray-500 text-sm">{application.job?.company} • {application.job?.location}</p>
                                                <p className="text-gray-400 text-xs mt-1">
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
            </div>
        </div>
    );
};

export default StudentDashboard;
