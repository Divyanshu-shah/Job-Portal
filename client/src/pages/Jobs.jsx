import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import JobCard from '../components/JobCard';
import AnimatedSection from '../components/AnimatedSection';
import { FaSearch, FaFilter, FaTimes, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';

const Jobs = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '', location: searchParams.get('location') || '',
        jobType: searchParams.get('jobType') || '', experience: searchParams.get('experience') || '',
        page: parseInt(searchParams.get('page')) || 1
    });

    useEffect(() => { fetchJobs(); }, [filters]);

    const fetchJobs = async () => {
        setLoading(true);
        try { const response = await jobsAPI.getAll(filters); setJobs(response.data.jobs); setTotalPages(response.data.totalPages); }
        catch (err) { setError('Failed to fetch jobs'); console.error(err); }
        setLoading(false);
    };

    const handleSearch = (e) => { e.preventDefault(); setFilters({ ...filters, page: 1 }); updateSearchParams(); };

    const updateSearchParams = () => {
        const params = {};
        if (filters.search) params.search = filters.search; if (filters.location) params.location = filters.location;
        if (filters.jobType) params.jobType = filters.jobType; if (filters.experience) params.experience = filters.experience;
        if (filters.page > 1) params.page = filters.page; setSearchParams(params);
    };

    const clearFilters = () => { setFilters({ search: '', location: '', jobType: '', experience: '', page: 1 }); setSearchParams({}); };

    const jobTypes = ['full-time', 'part-time', 'contract', 'internship', 'remote'];
    const experienceLevels = ['fresher', '1-2 years', '2-5 years', '5+ years'];

    return (
        <div className="page-container min-h-screen" style={{ background: 'var(--bg-tertiary)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AnimatedSection animation="blur-in" className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
                        style={{ background: 'var(--glass-bg)', border: '1px solid var(--card-border)', color: 'var(--primary)' }}>
                        <FaBriefcase className="text-xs" /> Opportunities
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        <span className="gradient-text">Browse Jobs</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--text-secondary)' }}>Discover thousands of job opportunities from top companies around the world.</p>
                </AnimatedSection>

                <AnimatedSection animation="tilt-in" delay={200}>
                    <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-8">
                        <div className="card p-3 flex flex-col md:flex-row gap-3">
                            <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                                <FaSearch style={{ color: 'var(--text-muted)' }} />
                                <input type="text" placeholder="Job title or keywords" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    className="flex-1 bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400" style={{ color: 'var(--text-primary)' }} />
                            </div>
                            <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                                <FaMapMarkerAlt style={{ color: 'var(--text-muted)' }} />
                                <input type="text" placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                    className="flex-1 bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400" style={{ color: 'var(--text-primary)' }} />
                            </div>
                            <button type="button" onClick={() => setShowFilters(!showFilters)} className="md:hidden btn btn-secondary flex items-center justify-center gap-2"><FaFilter /> Filters</button>
                            <button type="submit" className="btn btn-primary btn-ripple flex items-center justify-center gap-2"><FaSearch className="text-sm" /> Search</button>
                        </div>
                    </form>
                </AnimatedSection>

                <AnimatedSection animation="fade-in" delay={300} className={`max-w-4xl mx-auto mb-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
                    <div className="card p-4">
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex-1 min-w-[150px]">
                                <select value={filters.jobType} onChange={(e) => setFilters({ ...filters, jobType: e.target.value, page: 1 })} className="input-field">
                                    <option value="">All Job Types</option>
                                    {jobTypes.map((type) => <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</option>)}
                                </select>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <select value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value, page: 1 })} className="input-field">
                                    <option value="">All Experience</option>
                                    {experienceLevels.map((level) => <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>)}
                                </select>
                            </div>
                            {(filters.search || filters.location || filters.jobType || filters.experience) && (
                                <button onClick={clearFilters} className="flex items-center gap-2 text-red-500 hover:text-red-600 font-bold text-sm transition-colors hover-wiggle"><FaTimes /> Clear All</button>
                            )}
                        </div>
                    </div>
                </AnimatedSection>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="spinner"></div>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Loading jobs...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20"><p className="text-red-600 mb-4 font-medium">{error}</p><button onClick={fetchJobs} className="btn btn-primary mt-4">Try Again</button></div>
                ) : jobs.length === 0 ? (
                    <AnimatedSection animation="scale-in" className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center float" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                            <FaBriefcase className="text-3xl" style={{ color: 'var(--text-muted)' }} />
                        </div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No Jobs Found</h3>
                        <p className="mb-5" style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filters.</p>
                        <button onClick={clearFilters} className="btn btn-primary btn-ripple">Clear Filters</button>
                    </AnimatedSection>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {jobs.map((job, index) => (
                                <AnimatedSection key={job._id} animation="fade-in-up" delay={index * 80}>
                                    <JobCard job={job} />
                                </AnimatedSection>
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <AnimatedSection animation="fade-in" className="flex justify-center gap-3 items-center">
                                <button onClick={() => setFilters({ ...filters, page: filters.page - 1 })} disabled={filters.page === 1} className="btn btn-secondary btn-ripple disabled:opacity-40 text-sm">Previous</button>
                                <span className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: 'var(--card-bg)', color: 'var(--text-secondary)', border: '1px solid var(--card-border)' }}>Page {filters.page} of {totalPages}</span>
                                <button onClick={() => setFilters({ ...filters, page: filters.page + 1 })} disabled={filters.page === totalPages} className="btn btn-secondary btn-ripple disabled:opacity-40 text-sm">Next</button>
                            </AnimatedSection>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Jobs;
