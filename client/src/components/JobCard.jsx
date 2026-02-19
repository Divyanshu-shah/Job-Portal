import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaDollarSign, FaArrowRight } from 'react-icons/fa';

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
            'full-time': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
            'part-time': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
            'contract': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
            'internship': 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
            'remote': 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    const getGradient = (char) => {
        const gradients = [
            'from-emerald-500 to-teal-600',
            'from-amber-500 to-orange-600',
            'from-sky-500 to-blue-600',
            'from-rose-500 to-pink-600',
            'from-violet-500 to-purple-600',
            'from-lime-500 to-green-600',
        ];
        const idx = (char?.charCodeAt(0) || 0) % gradients.length;
        return gradients[idx];
    };

    return (
        <div className="card card-tilt p-6 group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${getGradient(job.company)} rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-400 group-hover:scale-105`}>
                        {job.company?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                            <Link to={`/jobs/${job._id}`}>{job.title}</Link>
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{job.company}</p>
                    </div>
                </div>
                <span className={`badge ${getJobTypeBadge(job.jobType)}`}>{job.jobType?.replace('-', ' ')}</span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">{job.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {job.skills?.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-lg font-medium">{skill}</span>
                ))}
                {job.skills?.length > 3 && (
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs rounded-lg font-medium">+{job.skills.length - 3} more</span>
                )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-emerald-500 text-xs" />{job.location}</span>
                <span className="flex items-center gap-1.5"><FaBriefcase className="text-emerald-500 text-xs" />{job.experience}</span>
                <span className="flex items-center gap-1.5"><FaDollarSign className="text-emerald-500 text-xs" />{job.salary}</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <span className="flex items-center gap-1.5 text-xs text-gray-400"><FaClock />{formatDate(job.createdAt)}</span>
                <Link to={`/jobs/${job._id}`} className="btn btn-primary btn-ripple text-sm py-2 px-5 flex items-center gap-2 group/btn">
                    View Details <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
            </div>
        </div>
    );
};

export default JobCard;
