import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobsAPI, applicationsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AnimatedSection from '../components/AnimatedSection';
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

    useEffect(() => { fetchJob(); if (isStudent) checkIfApplied(); }, [id, isStudent]);

    const fetchJob = async () => { try { const r = await jobsAPI.getById(id); setJob(r.data); } catch (err) { setError('Failed to fetch job details'); } setLoading(false); };
    const checkIfApplied = async () => { try { const r = await applicationsAPI.getStudentApplications(); setApplied(r.data.some(app => app.job._id === id)); } catch (err) { console.error(err); } };

    const handleApply = async (e) => {
        e.preventDefault(); setApplyError('');
        if (!resume) { setApplyError('Please upload your resume'); return; }
        setApplying(true);
        try { await applicationsAPI.apply({ jobId: id, resume, coverLetter }); setApplied(true); setShowApplyModal(false); }
        catch (err) { setApplyError(err.response?.data?.message || 'Failed to submit application'); }
        setApplying(false);
    };

    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const getJobTypeBadge = (type) => {
        const c = { 'full-time': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', 'part-time': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300', 'contract': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300', 'internship': 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300', 'remote': 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300' };
        return c[type] || 'bg-gray-100 text-gray-800';
    };

    const getGradient = (char) => {
        const g = ['from-emerald-500 to-teal-600', 'from-amber-500 to-orange-600', 'from-sky-500 to-blue-600', 'from-rose-500 to-pink-600', 'from-violet-500 to-purple-600', 'from-lime-500 to-green-600'];
        return g[(char?.charCodeAt(0) || 0) % g.length];
    };

    if (loading) return <div className="page-container flex items-center justify-center min-h-screen"><div className="spinner"></div></div>;
    if (error || !job) return <div className="page-container flex flex-col items-center justify-center min-h-screen"><p className="text-red-600 mb-4 font-medium">{error || 'Job not found'}</p><Link to="/jobs" className="btn btn-primary">Back to Jobs</Link></div>;

    return (
        <div className="page-container min-h-screen" style={{ background: 'var(--bg-tertiary)' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 font-medium mb-6 transition-colors duration-300 hover:text-emerald-600 slide-in-left" style={{ color: 'var(--text-secondary)' }}><FaArrowLeft /> Back to Jobs</button>

                <AnimatedSection animation="tilt-in">
                    <div className="card p-8 mb-6">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div className={`w-20 h-20 bg-gradient-to-br ${getGradient(job.company)} rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0 shadow-xl icon-hover-bounce`}>{job.company?.charAt(0).toUpperCase()}</div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>{job.title}</h1>
                                    <span className={`badge ${getJobTypeBadge(job.jobType)}`}>{job.jobType?.replace('-', ' ')}</span>
                                </div>
                                <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>{job.company}</p>
                                <div className="flex flex-wrap gap-5" style={{ color: 'var(--text-muted)' }}>
                                    <span className="flex items-center gap-2 text-sm"><FaMapMarkerAlt className="text-emerald-500" />{job.location}</span>
                                    <span className="flex items-center gap-2 text-sm"><FaBriefcase className="text-emerald-500" />{job.experience}</span>
                                    <span className="flex items-center gap-2 text-sm"><FaDollarSign className="text-emerald-500" />{job.salary}</span>
                                    <span className="flex items-center gap-2 text-sm"><FaClock className="text-emerald-500" />Posted {formatDate(job.createdAt)}</span>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                {!isAuthenticated ? <Link to="/login" className="btn btn-primary btn-ripple">Login to Apply</Link>
                                    : applied ? <button disabled className="btn bg-emerald-500 text-white flex items-center gap-2 shadow-lg shadow-emerald-500/25 bounce-in"><FaCheckCircle /> Applied</button>
                                        : isStudent ? <button onClick={() => setShowApplyModal(true)} className="btn btn-primary btn-ripple pulse-glow">Apply Now</button> : null}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <AnimatedSection animation="fade-in-up" delay={100}>
                            <div className="card p-6">
                                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>Job Description</h2>
                                <p className="whitespace-pre-line leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{job.description}</p>
                            </div>
                        </AnimatedSection>
                        {job.requirements?.length > 0 && (
                            <AnimatedSection animation="slide-in-left" delay={200}>
                                <div className="card p-6">
                                    <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>Requirements</h2>
                                    <ul className="space-y-3">{job.requirements.map((req, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                            <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 flex-shrink-0"></span>{req}
                                        </li>))}
                                    </ul>
                                </div>
                            </AnimatedSection>
                        )}
                    </div>
                    <div className="space-y-6">
                        {job.skills?.length > 0 && (
                            <AnimatedSection animation="slide-in-right" delay={150}>
                                <div className="card p-6">
                                    <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Required Skills</h3>
                                    <div className="flex flex-wrap gap-2">{job.skills.map((skill, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default">{skill}</span>))}
                                    </div>
                                </div>
                            </AnimatedSection>
                        )}
                        <AnimatedSection animation="slide-in-right" delay={250}>
                            <div className="card card-tilt p-6">
                                <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>About Company</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${getGradient(job.company)} rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}>{job.company?.charAt(0)}</div>
                                    <div><p className="font-bold" style={{ color: 'var(--text-primary)' }}>{job.company}</p><p className="text-sm" style={{ color: 'var(--text-muted)' }}>Posted by {job.postedBy?.name}</p></div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>

            {showApplyModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'var(--modal-overlay)' }}>
                    <div className="card max-w-lg w-full p-8 scale-in" style={{ background: 'var(--bg-secondary)' }}>
                        <h2 className="text-2xl font-extrabold mb-6" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>Apply for {job.title}</h2>
                        {applyError && <div className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">{applyError}</div>}
                        <form onSubmit={handleApply} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Upload Resume (PDF only) *</label>
                                <div className="border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 hover:border-emerald-500 group cursor-pointer" style={{ borderColor: 'var(--input-border)' }}>
                                    <input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} className="hidden" id="resume-upload" />
                                    <label htmlFor="resume-upload" className="cursor-pointer">
                                        <div className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: 'var(--bg-tertiary)' }}>
                                            <FaUpload className="text-xl" style={{ color: 'var(--text-muted)' }} />
                                        </div>
                                        {resume ? <p className="text-emerald-600 dark:text-emerald-400 font-bold">{resume.name}</p> : <p style={{ color: 'var(--text-muted)' }}>Click to upload your resume</p>}
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Cover Letter (Optional)</label>
                                <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows={4} className="input-field" placeholder="Tell the recruiter why you're a great fit..."></textarea>
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setShowApplyModal(false)} className="flex-1 btn btn-secondary btn-ripple">Cancel</button>
                                <button type="submit" disabled={applying} className="flex-1 btn btn-primary btn-ripple flex items-center justify-center gap-2">
                                    {applying ? <div className="spinner w-5 h-5 border-2"></div> : 'Submit Application'}
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
