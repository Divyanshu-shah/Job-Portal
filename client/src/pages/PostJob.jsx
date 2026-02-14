import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaDollarSign, FaFileAlt, FaPlus, FaTimes, FaArrowLeft } from 'react-icons/fa';

const PostJob = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        company: user?.company || '',
        location: '',
        salary: '',
        description: '',
        requirements: [''],
        skills: [''],
        jobType: 'full-time',
        experience: 'fresher',
        applicationDeadline: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleArrayChange = (field, index, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData({ ...formData, [field]: newArray });
    };

    const addArrayItem = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ''] });
    };

    const removeArrayItem = (field, index) => {
        const newArray = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: newArray });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Filter out empty strings from arrays
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
        <div className="page-container bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6"
                >
                    <FaArrowLeft /> Back to Dashboard
                </button>

                <div className="card p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FaBriefcase className="text-3xl text-indigo-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
                        <p className="text-gray-600 mt-2">Fill in the details to create a job listing</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Job Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Title *
                            </label>
                            <div className="relative">
                                <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
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

                        {/* Company */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name *
                            </label>
                            <div className="relative">
                                <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
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

                        {/* Location & Salary */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location *
                                </label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="input-field pl-11"
                                        placeholder="e.g. New York, NY"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Salary *
                                </label>
                                <div className="relative">
                                    <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        className="input-field pl-11"
                                        placeholder="e.g. $80,000 - $100,000"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Job Type & Experience */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Type
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Experience Level
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

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={6}
                                className="input-field"
                                placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
                                required
                            ></textarea>
                        </div>

                        {/* Requirements */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Requirements
                            </label>
                            {formData.requirements.map((req, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={req}
                                        onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                                        className="input-field"
                                        placeholder="e.g. 3+ years of React experience"
                                    />
                                    {formData.requirements.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('requirements', index)}
                                            className="p-3 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <FaTimes />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem('requirements')}
                                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                            >
                                <FaPlus /> Add Requirement
                            </button>
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Required Skills
                            </label>
                            {formData.skills.map((skill, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={skill}
                                        onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                                        className="input-field"
                                        placeholder="e.g. React, TypeScript, Node.js"
                                    />
                                    {formData.skills.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('skills', index)}
                                            className="p-3 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <FaTimes />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem('skills')}
                                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                            >
                                <FaPlus /> Add Skill
                            </button>
                        </div>

                        {/* Application Deadline */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Application Deadline (Optional)
                            </label>
                            <input
                                type="date"
                                name="applicationDeadline"
                                value={formData.applicationDeadline}
                                onChange={handleChange}
                                className="input-field"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn btn-primary flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="spinner w-5 h-5 border-2"></div>
                            ) : (
                                <>
                                    <FaBriefcase /> Post Job
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
