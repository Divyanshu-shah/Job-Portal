import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobsAPI, applicationsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaClock, FaBuilding, FaArrowLeft, FaCheckCircle, FaUpload } from 'react-icons/fa';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isStudent, isAuthenticated } = useAuth();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [applying, setApplying] = useState(false);
    const [applied, setApplied] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [applyError, setApplyError] = useState('');

    useEffect(() => {
        fetchJob();
        if (isStudent) {
            checkIfApplied();
        }
    }, [id, isStudent]);

    const fetchJob = async () => {
        try {
            const response = await jobsAPI.getById(id);
            setJob(response.data);
        } catch (err) {
            setError('Failed to fetch job details');
            console.error(err);
        }
        setLoading(false);
    };

    const checkIfApplied = async () => {
        try {
            const response = await applicationsAPI.getStudentApplications();
            const hasApplied = response.data.some(app => app.job._id === id);
            setApplied(hasApplied);
        } catch (err) {
            console.error(err);
        }
    };

    const handleApply = async (e) => {
        e.preventDefault();
        setApplyError('');

        if (!resume) {
            setApplyError('Please upload your resume');
            return;
        }

        setApplying(true);

        try {
            await applicationsAPI.apply({
                jobId: id,
                resume: resume,
                coverLetter: coverLetter
            });
            setApplied(true);
            setShowApplyModal(false);
        } catch (err) {
            setApplyError(err.response?.data?.message || 'Failed to submit application');
        }

        setApplying(false);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getJobTypeBadge = (type) => {
        const colors = {
            'full-time': 'bg-green-100 text-green-800',
            'part-time': 'bg-blue-100 text-blue-800',
            'contract': 'bg-orange-100 text-orange-800',
            'internship': 'bg-purple-100 text-purple-800',
            'remote': 'bg-teal-100 text-teal-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="page-container flex items-center justify-center min-h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="page-container flex flex-col items-center justify-center min-h-screen">
                <p className="text-red-600 mb-4">{error || 'Job not found'}</p>
                <Link to="/jobs" className="btn btn-primary">
                    Back to Jobs
                </Link>
            </div>
        );
    }

    return (
        <div className="page-container bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6"
                >
                    <FaArrowLeft /> Back to Jobs
                </button>

                {/* Job Header */}
                <div className="card p-8 mb-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                            {job.company?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
                                <span className={`badge ${getJobTypeBadge(job.jobType)}`}>
                                    {job.jobType?.replace('-', ' ')}
                                </span>
                            </div>
                            <p className="text-lg text-gray-600 mb-4">{job.company}</p>

                            <div className="flex flex-wrap gap-4 text-gray-500">
                                <span className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-indigo-500" />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FaBriefcase className="text-indigo-500" />
                                    {job.experience}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FaDollarSign className="text-indigo-500" />
                                    {job.salary}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FaClock className="text-indigo-500" />
                                    Posted {formatDate(job.createdAt)}
                                </span>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <div className="flex-shrink-0">
                            {!isAuthenticated ? (
                                <Link to="/login" className="btn btn-primary">
                                    Login to Apply
                                </Link>
                            ) : applied ? (
                                <button disabled className="btn bg-green-500 text-white flex items-center gap-2">
                                    <FaCheckCircle /> Applied
                                </button>
                            ) : isStudent ? (
                                <button
                                    onClick={() => setShowApplyModal(true)}
                                    className="btn btn-primary"
                                >
                                    Apply Now
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Job Details */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        {/* Description */}
                        <div className="card p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
                            </div>
                        </div>

                        {/* Requirements */}
                        {job.requirements?.length > 0 && (
                            <div className="card p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                                <ul className="space-y-2">
                                    {job.requirements.map((req, index) => (
                                        <li key={index} className="flex items-start gap-2 text-gray-600">
                                            <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></span>
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Skills */}
                        {job.skills?.length > 0 && (
                            <div className="card p-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Company Info */}
                        <div className="card p-6">
                            <h3 className="font-semibold text-gray-900 mb-3">About Company</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                                    {job.company?.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{job.company}</p>
                                    <p className="text-sm text-gray-500">Posted by {job.postedBy?.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            {showApplyModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for {job.title}</h2>

                        {applyError && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                {applyError}
                            </div>
                        )}

                        <form onSubmit={handleApply} className="space-y-5">
                            {/* Resume Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Resume (PDF only) *
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setResume(e.target.files[0])}
                                        className="hidden"
                                        id="resume-upload"
                                    />
                                    <label htmlFor="resume-upload" className="cursor-pointer">
                                        <FaUpload className="text-3xl text-gray-400 mx-auto mb-2" />
                                        {resume ? (
                                            <p className="text-indigo-600 font-medium">{resume.name}</p>
                                        ) : (
                                            <p className="text-gray-500">Click to upload your resume</p>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Cover Letter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cover Letter (Optional)
                                </label>
                                <textarea
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                    rows={4}
                                    className="input-field"
                                    placeholder="Tell the recruiter why you're a great fit for this role..."
                                ></textarea>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowApplyModal(false)}
                                    className="flex-1 btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={applying}
                                    className="flex-1 btn btn-primary flex items-center justify-center gap-2"
                                >
                                    {applying ? (
                                        <div className="spinner w-5 h-5 border-2"></div>
                                    ) : (
                                        'Submit Application'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetails;
