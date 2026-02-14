import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import JobCard from '../components/JobCard';
import { FaSearch, FaFilter, FaTimes, FaBriefcase } from 'react-icons/fa';

const Jobs = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        location: searchParams.get('location') || '',
        jobType: searchParams.get('jobType') || '',
        experience: searchParams.get('experience') || '',
        page: parseInt(searchParams.get('page')) || 1
    });

    useEffect(() => {
        fetchJobs();
    }, [filters]);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await jobsAPI.getAll(filters);
            setJobs(response.data.jobs);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError('Failed to fetch jobs');
            console.error(err);
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setFilters({ ...filters, page: 1 });
        updateSearchParams();
    };

    const updateSearchParams = () => {
        const params = {};
        if (filters.search) params.search = filters.search;
        if (filters.location) params.location = filters.location;
        if (filters.jobType) params.jobType = filters.jobType;
        if (filters.experience) params.experience = filters.experience;
        if (filters.page > 1) params.page = filters.page;
        setSearchParams(params);
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            location: '',
            jobType: '',
            experience: '',
            page: 1
        });
        setSearchParams({});
    };

    const jobTypes = ['full-time', 'part-time', 'contract', 'internship', 'remote'];
    const experienceLevels = ['fresher', '1-2 years', '2-5 years', '5+ years'];

    return (
        <div className="page-container bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        <span className="gradient-text">Browse Jobs</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover thousands of job opportunities from top companies around the world.
                    </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-3 flex flex-col md:flex-row gap-3">
                        <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                            <FaSearch className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Job title or keywords"
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                        </div>
                        <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                            <input
                                type="text"
                                placeholder="Location"
                                value={filters.location}
                                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden btn btn-secondary flex items-center justify-center gap-2"
                        >
                            <FaFilter />
                            Filters
                        </button>
                        <button type="submit" className="btn btn-primary flex items-center justify-center gap-2">
                            <FaSearch />
                            Search
                        </button>
                    </div>
                </form>

                {/* Filters */}
                <div className={`max-w-4xl mx-auto mb-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
                    <div className="bg-white rounded-xl shadow-md p-4">
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex-1 min-w-[150px]">
                                <select
                                    value={filters.jobType}
                                    onChange={(e) => setFilters({ ...filters, jobType: e.target.value, page: 1 })}
                                    className="input-field"
                                >
                                    <option value="">All Job Types</option>
                                    {jobTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <select
                                    value={filters.experience}
                                    onChange={(e) => setFilters({ ...filters, experience: e.target.value, page: 1 })}
                                    className="input-field"
                                >
                                    <option value="">All Experience</option>
                                    {experienceLevels.map((level) => (
                                        <option key={level} value={level}>
                                            {level.charAt(0).toUpperCase() + level.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {(filters.search || filters.location || filters.jobType || filters.experience) && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                                >
                                    <FaTimes /> Clear All
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="spinner"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-600">{error}</p>
                        <button onClick={fetchJobs} className="btn btn-primary mt-4">
                            Try Again
                        </button>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20">
                        <FaBriefcase className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Jobs Found</h3>
                        <p className="text-gray-500 mb-4">Try adjusting your search or filters.</p>
                        <button onClick={clearFilters} className="btn btn-primary">
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {jobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                                    disabled={filters.page === 1}
                                    className="btn btn-secondary disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span className="flex items-center px-4 text-gray-600">
                                    Page {filters.page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                                    disabled={filters.page === totalPages}
                                    className="btn btn-secondary disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Jobs;
