import { Link } from 'react-router-dom';
import { FaSearch, FaBriefcase, FaUserTie, FaRocket, FaChartLine, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import heroBg from '../img1.jpg';

const Home = () => {
    const features = [
        {
            icon: <FaBriefcase className="text-3xl" />,
            title: 'Find Dream Jobs',
            description: 'Browse thousands of job listings from top companies and find the perfect match for your skills.'
        },
        {
            icon: <FaUserTie className="text-3xl" />,
            title: 'Connect with Recruiters',
            description: 'Direct access to hiring managers and recruiters looking for talented individuals like you.'
        },
        {
            icon: <FaRocket className="text-3xl" />,
            title: 'Quick Applications',
            description: 'Apply to multiple jobs with just a few clicks. Upload your resume once and use it everywhere.'
        },
        {
            icon: <FaChartLine className="text-3xl" />,
            title: 'Track Progress',
            description: 'Monitor your application status in real-time. Never miss an update on your job applications.'
        }
    ];

    const stats = [
        { value: '10K+', label: 'Active Jobs' },
        { value: '5K+', label: 'Companies' },
        { value: '50K+', label: 'Students' },
        { value: '95%', label: 'Success Rate' }
    ];

    return (
        <div className="page-container">
            {/* Hero Section */}
            <section
                className="relative py-20 lg:py-32 overflow-hidden"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                            Find Your Dream Job
                            <span className="block text-indigo-200">Start Your Career Today</span>
                        </h1>
                        <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
                            Connect with top employers, discover amazing opportunities, and take the next step in your professional journey.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                                <FaSearch className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Job title, keywords, or company"
                                    className="flex-1 bg-transparent outline-none text-gray-700"
                                />
                            </div>
                            <Link to="/jobs" className="btn btn-primary flex items-center justify-center gap-2 py-3 px-6">
                                Search Jobs
                                <FaArrowRight />
                            </Link>
                        </div>

                        {/* Quick Links */}
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link to="/register" className="text-indigo-200 hover:text-white transition-colors">
                                <FaUserTie className="inline mr-2" /> For Students
                            </Link>
                            <span className="text-indigo-300">|</span>
                            <Link to="/register" className="text-indigo-200 hover:text-white transition-colors">
                                <FaBriefcase className="inline mr-2" /> For Recruiters
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-indigo-600">{stat.value}</div>
                                <div className="text-gray-500 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose JobPortal?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We provide the best platform for job seekers and recruiters to connect and find the perfect match.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="card p-6 text-center group hover:bg-indigo-600 transition-colors duration-300">
                                <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-white group-hover:text-indigo-600 transition-colors duration-300 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 group-hover:text-indigo-100 text-sm transition-colors duration-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center mb-6">
                        <FaShieldAlt className="text-5xl text-indigo-400" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Join thousands of students and recruiters who have found their perfect match through JobPortal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register" className="btn btn-primary">
                            Create Free Account
                        </Link>
                        <Link to="/jobs" className="btn btn-outline border-white text-white hover:bg-white hover:text-gray-900">
                            Browse Jobs
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
