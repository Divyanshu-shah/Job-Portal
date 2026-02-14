import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaDollarSign } from 'react-icons/fa';

const JobCard = ({ job }) => {
    const formatDate = (date) => {
        const d = new Date(date);
        const now = new Date();
        const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));

        if (diff === 0) return 'Today';
        if (diff === 1) return 'Yesterday';
        if (diff < 7) return `${diff} days ago`;
        return d.toLocaleDateString();
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

    return (
        <div className="card p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                        {job.company?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900 hover:text-indigo-600 transition-colors">
                            <Link to={`/jobs/${job._id}`}>{job.title}</Link>
                        </h3>
                        <p className="text-gray-500">{job.company}</p>
                    </div>
                </div>
                <span className={`badge ${getJobTypeBadge(job.jobType)}`}>
                    {job.jobType?.replace('-', ' ')}
                </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {job.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {job.skills?.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        {skill}
                    </span>
                ))}
                {job.skills?.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                        +{job.skills.length - 3} more
                    </span>
                )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-indigo-500" />
                    {job.location}
                </span>
                <span className="flex items-center gap-1">
                    <FaBriefcase className="text-indigo-500" />
                    {job.experience}
                </span>
                <span className="flex items-center gap-1">
                    <FaDollarSign className="text-indigo-500" />
                    {job.salary}
                </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="flex items-center gap-1 text-sm text-gray-400">
                    <FaClock />
                    {formatDate(job.createdAt)}
                </span>
                <Link
                    to={`/jobs/${job._id}`}
                    className="btn btn-primary text-sm py-2 px-4"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default JobCard;
