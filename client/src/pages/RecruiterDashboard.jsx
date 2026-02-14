import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsAPI, applicationsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaBriefcase, FaUsers, FaEye, FaPlusCircle, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const RecruiterDashboard = () => {
    const { user, isApproved } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showApplications, setShowApplications] = useState(false);
    const [jobApplications, setJobApplications] = useState([]);
    const [loadingApps, setLoadingApps] = useState(false);

    useEffect(() => {
        if (isApproved) {
            fetchJobs();
            fetchAllApplications();
        } else {
            setLoading(false);
        }
    }, [isApproved]);

    const fetchJobs = async () => {
        try {
            const response = await jobsAPI.getRecruiterJobs();
            setJobs(response.data);
        } catch (err) {
            console.error('Failed to fetch jobs:', err);
        }
        setLoading(false);
    };

    const fetchAllApplications = async () => {
        try {
            const response = await applicationsAPI.getRecruiterApplications();
            setApplications(response.data);
        } catch (err) {
            console.error('Failed to fetch applications:', err);
        }
    };

    const fetchJobApplications = async (jobId) => {
        setLoadingApps(true);
        try {
            const response = await applicationsAPI.getJobApplications(jobId);
            setJobApplications(response.data);
        } catch (err) {
            console.error('Failed to fetch job applications:', err);
        }
        setLoadingApps(false);
    };

    const handleViewApplications = (job) => {
        setSelectedJob(job);
        setShowApplications(true);
        fetchJobApplications(job._id);
    };

    const handleUpdateStatus = async (applicationId, status) => {
        try {
            await applicationsAPI.updateStatus(applicationId, { status });
            fetchJobApplications(selectedJob._id);
            fetchAllApplications();
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (!window.confirm('Are you sure you want to delete this job? All applications will also be deleted.')) {
            return;
        }
        try {
            await jobsAPI.delete(jobId);
            fetchJobs();
        } catch (err) {
            console.error('Failed to delete job:', err);
        }
    };

    const stats = {
        totalJobs: jobs.length,
        activeJobs: jobs.filter(j => j.isActive).length,
        totalApplications: applications.length,
        pending: applications.filter(a => a.status === 'Applied').length
    };

    // Pending approval screen
    if (!isApproved) {
        return (
            <div className="page-container min-h-screen flex items-center justify-center bg-gray-50">
                <div className="card max-w-md w-full mx-4 p-8 text-center">
                    <FaExclamationTriangle className="text-6xl text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Pending Approval</h2>
                    <p className="text-gray-600 mb-6">
                        Your recruiter account is pending admin approval. You will be able to post jobs once approved.
                    </p>
                    <Link to="/" className="btn btn-primary">
                        Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome, <span className="gradient-text">{user?.name}</span>!
                        </h1>
                        <p className="text-gray-600 mt-1">{user?.company}</p>
                    </div>
                    <Link to="/recruiter/post-job" className="btn btn-primary flex items-center gap-2">
                        <FaPlusCircle /> Post New Job
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-card-value">{stats.totalJobs}</p>
                                <p className="stat-card-label">Total Jobs</p>
                            </div>
                            <FaBriefcase className="text-3xl text-indigo-200" />
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-card-value text-green-600">{stats.activeJobs}</p>
                                <p className="stat-card-label">Active Jobs</p>
                            </div>
                            <FaCheckCircle className="text-3xl text-green-200" />
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-card-value text-blue-600">{stats.totalApplications}</p>
                                <p className="stat-card-label">Total Applications</p>
                            </div>
                            <FaUsers className="text-3xl text-blue-200" />
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-card-value text-yellow-600">{stats.pending}</p>
                                <p className="stat-card-label">Pending Review</p>
                            </div>
                            <FaClock className="text-3xl text-yellow-200" />
                        </div>
                    </div>
                </div>

                {/* Jobs List */}
                <div className="card">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900">My Job Postings</h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="spinner"></div>
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-12">
                            <FaBriefcase className="text-5xl text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-700 mb-2">No Jobs Posted</h3>
                            <p className="text-gray-500 mb-4">Start posting jobs to find talented candidates.</p>
                            <Link to="/recruiter/post-job" className="btn btn-primary">
                                Post Your First Job
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {jobs.map((job) => (
                                <div key={job._id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                <Link to={`/jobs/${job._id}`} className="hover:text-indigo-600">
                                                    {job.title}
                                                </Link>
                                            </h3>
                                            <p className="text-gray-500 text-sm">{job.location} • {job.jobType}</p>
                                            <p className="text-gray-400 text-xs mt-1">
                                                Posted on {new Date(job.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleViewApplications(job)}
                                                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                                            >
                                                <FaEye /> {job.applicationsCount || 0} Applications
                                            </button>
                                            <button
                                                onClick={() => handleDeleteJob(job._id)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Applications Modal */}
            {showApplications && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden fade-in">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Applications</h2>
                                <p className="text-gray-500">{selectedJob?.title}</p>
                            </div>
                            <button
                                onClick={() => setShowApplications(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <FaTimesCircle className="text-2xl" />
                            </button>
                        </div>

                        <div className="overflow-y-auto max-h-[60vh]">
                            {loadingApps ? (
                                <div className="flex justify-center py-12">
                                    <div className="spinner"></div>
                                </div>
                            ) : jobApplications.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No applications yet.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {jobApplications.map((app) => (
                                        <div key={app._id} className="p-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{app.student?.name}</h3>
                                                    <p className="text-gray-500 text-sm">{app.student?.email}</p>
                                                    <a
                                                        href={`${import.meta.env.VITE_API_URL || ''}/${app.resume ? app.resume.replace(/\\/g, '/') : ''}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-indigo-600 text-sm hover:underline"
                                                    >
                                                        View Resume
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={app.status}
                                                        onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                                                        className="input-field py-2 text-sm"
                                                    >
                                                        <option value="Applied">Applied</option>
                                                        <option value="Reviewed">Reviewed</option>
                                                        <option value="Shortlisted">Shortlisted</option>
                                                        <option value="Accepted">Accepted</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecruiterDashboard;
