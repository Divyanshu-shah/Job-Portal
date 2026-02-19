import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaDollarSign, FaFileAlt, FaPlus, FaTimes, FaClock, FaPaperPlane, FaCode, FaStar } from 'react-icons/fa';

const PostJob = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        company: user?.company || '',
        location: '',
        salary: '',
        jobType: 'full-time',
        experience: 'fresher',
        description: '',
        requirements: [''],
        skills: [''],
        applicationDeadline: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleArrayChange = (field, index, value) => {
        const updated = [...formData[field]];
        updated[index] = value;
        setFormData({ ...formData, [field]: updated });
    };

    const addArrayItem = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ''] });
    };

    const removeArrayItem = (field, index) => {
        if (formData[field].length > 1) {
            const updated = formData[field].filter((_, i) => i !== index);
            setFormData({ ...formData, [field]: updated });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const jobData = {
                ...formData,
                requirements: formData.requirements.filter(r => r.trim()),
                skills: formData.skills.filter(s => s.trim())
            };

            await jobsAPI.create(jobData);
            navigate('/recruiter/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post job');
        }

        setLoading(false);
    };

    const jobTypes = ['full-time', 'part-time', 'contract', 'internship', 'remote'];
    const experienceLevels = ['fresher', '1-2 years', '2-5 years', '5+ years'];

    return (
        <div className="page-container min-h-screen" style={{ background: 'var(--bg-tertiary)' }}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-10 fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
                        style={{ background: 'var(--glass-bg)', border: '1px solid var(--card-border)', color: 'var(--primary)' }}>
                        <FaPlus className="text-xs" />
                        New Listing
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                        Post a <span className="gradient-text">New Job</span>
                    </h1>
                    <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>Fill in the details to create your job listing.</p>
                </div>

                {/* Form Card */}
                <div className="card p-8 fade-in-up">
                    {error && (
                        <div className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Job Title */}
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                Job Title *
                            </label>
                            <div className="relative">
                                <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="input-field pl-11"
                                    placeholder="e.g. Senior Frontend Developer"
                                    required
                                />
                            </div>
                        </div>

                        {/* Company & Location */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                    Company *
                                </label>
                                <div className="relative">
                                    <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="input-field pl-11"
                                        placeholder="Company name"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                    Location *
                                </label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="input-field pl-11"
                                        placeholder="e.g. Remote, Bangalore"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Salary & Type & Experience */}
                        <div className="grid md:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                    Salary
                                </label>
                                <div className="relative">
                                    <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        className="input-field pl-11"
                                        placeholder="e.g. 10-15 LPA"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                    Job Type *
                                </label>
                                <select
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    className="input-field"
                                >
                                    {jobTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                    Experience *
                                </label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="input-field"
                                >
                                    {experienceLevels.map((level) => (
                                        <option key={level} value={level}>
                                            {level.charAt(0).toUpperCase() + level.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Application Deadline */}
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                Application Deadline
                            </label>
                            <div className="relative">
                                <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }} />
                                <input
                                    type="date"
                                    name="applicationDeadline"
                                    value={formData.applicationDeadline}
                                    onChange={handleChange}
                                    className="input-field pl-11"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                Job Description *
                            </label>
                            <div className="relative">
                                <FaFileAlt className="absolute left-4 top-4 text-sm" style={{ color: 'var(--text-muted)' }} />
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    className="input-field pl-11"
                                    placeholder="Describe the role, responsibilities, and what the candidate will be working on..."
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Requirements */}
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                Requirements
                            </label>
                            <div className="space-y-3">
                                {formData.requirements.map((req, index) => (
                                    <div key={index} className="flex gap-2">
                                        <div className="relative flex-1">
                                            <FaStar className="absolute left-4 top-1/2 -translate-y-1/2 text-xs" style={{ color: 'var(--text-muted)' }} />
                                            <input
                                                type="text"
                                                value={req}
                                                onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                                                className="input-field pl-11"
                                                placeholder="Add a requirement"
                                            />
                                        </div>
                                        {formData.requirements.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem('requirements', index)}
                                                className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                            >
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayItem('requirements')}
                                    className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                                >
                                    <FaPlus className="text-xs" /> Add Requirement
                                </button>
                            </div>
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                Required Skills
                            </label>
                            <div className="space-y-3">
                                {formData.skills.map((skill, index) => (
                                    <div key={index} className="flex gap-2">
                                        <div className="relative flex-1">
                                            <FaCode className="absolute left-4 top-1/2 -translate-y-1/2 text-xs" style={{ color: 'var(--text-muted)' }} />
                                            <input
                                                type="text"
                                                value={skill}
                                                onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                                                className="input-field pl-11"
                                                placeholder="Add a skill (e.g. React, Node.js)"
                                            />
                                        </div>
                                        {formData.skills.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem('skills', index)}
                                                className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                            >
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayItem('skills')}
                                    className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                                >
                                    <FaPlus className="text-xs" /> Add Skill
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn btn-primary flex items-center justify-center gap-2 py-4 text-lg"
                        >
                            {loading ? (
                                <div className="spinner w-5 h-5 border-2"></div>
                            ) : (
                                <>
                                    <FaPaperPlane /> Publish Job
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostJob;
