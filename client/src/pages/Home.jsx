import { Link } from 'react-router-dom';
import { FaSearch, FaBriefcase, FaUserTie, FaRocket, FaChartLine, FaShieldAlt, FaArrowRight, FaStar } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import CountUp from '../components/CountUp';
import heroBg from '../img1.jpg';

const Home = () => {
    const features = [
        { icon: <FaBriefcase className="text-3xl" />, title: 'Find Dream Jobs', description: 'Browse thousands of job listings from top companies and find the perfect match for your skills.', gradient: 'from-emerald-500 to-teal-600' },
        { icon: <FaUserTie className="text-3xl" />, title: 'Connect with Recruiters', description: 'Direct access to hiring managers and recruiters looking for talented individuals like you.', gradient: 'from-amber-500 to-orange-600' },
        { icon: <FaRocket className="text-3xl" />, title: 'Quick Applications', description: 'Apply to multiple jobs with just a few clicks. Upload your resume once and use it everywhere.', gradient: 'from-sky-500 to-blue-600' },
        { icon: <FaChartLine className="text-3xl" />, title: 'Track Progress', description: 'Monitor your application status in real-time. Never miss an update on your job applications.', gradient: 'from-rose-500 to-pink-600' }
    ];

    const stats = [
        { value: '10K+', label: 'Active Jobs', icon: <FaBriefcase /> },
        { value: '5K+', label: 'Companies', icon: <FaStar /> },
        { value: '50K+', label: 'Students', icon: <FaUserTie /> },
        { value: '95%', label: 'Success Rate', icon: <FaChartLine /> }
    ];

    return (
        <div className="page-container">
            {/* Hero Section */}
            <section className="relative py-24 lg:py-36 overflow-hidden" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(5, 150, 105, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(217, 119, 6, 0.3) 0%, transparent 50%)' }}></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <AnimatedSection animation="scale-in" delay={0}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-200 text-sm font-medium mb-6">
                                <FaStar className="text-amber-400 text-xs glow-ring" /> Trusted by 50,000+ students
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="blur-in" delay={200}>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Find Your Dream Job
                                <span className="block mt-2 bg-gradient-to-r from-emerald-300 via-teal-300 to-amber-300 bg-clip-text text-transparent">Start Your Career Today</span>
                            </h1>
                        </AnimatedSection>

                        <AnimatedSection animation="fade-in-up" delay={400}>
                            <p className="text-lg md:text-xl text-emerald-100/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                                Connect with top employers, discover amazing opportunities, and take the next step in your professional journey.
                            </p>
                        </AnimatedSection>

                        {/* Search Bar */}
                        <AnimatedSection animation="tilt-in" delay={600}>
                            <div className="max-w-2xl mx-auto rounded-2xl shadow-2xl shadow-black/20 p-2 flex flex-col sm:flex-row gap-2 backdrop-blur-xl" style={{ background: 'rgba(255,255,255,0.92)' }}>
                                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50/80 rounded-xl">
                                    <FaSearch className="text-gray-400" />
                                    <input type="text" placeholder="Job title, keywords, or company" className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400" />
                                </div>
                                <Link to="/jobs" className="btn btn-primary btn-ripple flex items-center justify-center gap-2 py-3 px-8">
                                    Search Jobs <FaArrowRight className="text-sm" />
                                </Link>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fade-in" delay={800}>
                            <div className="mt-10 flex flex-wrap justify-center gap-6">
                                <Link to="/register" className="text-emerald-200/80 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm underline-grow"><FaUserTie /> For Students</Link>
                                <span className="text-emerald-300/40">|</span>
                                <Link to="/register" className="text-emerald-200/80 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm underline-grow"><FaBriefcase /> For Recruiters</Link>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 relative" style={{ background: 'var(--bg-secondary)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="fade-in-up" stagger>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-card text-center group card-tilt">
                                    <CountUp
                                        end={stat.value}
                                        duration={2000}
                                        className="text-3xl md:text-4xl font-extrabold gradient-text mb-1 tracking-tight block"
                                        style={{ fontFamily: "'Outfit', sans-serif" }}
                                    />
                                    <div className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24" style={{ background: 'var(--bg-tertiary)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="blur-in" className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
                            style={{ background: 'var(--glass-bg)', border: '1px solid var(--card-border)', color: 'var(--primary)' }}>
                            <FaRocket className="text-xs hover-wiggle" /> Why Choose Us
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                            Why Choose <span className="gradient-text">JobPortal</span>?
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--text-secondary)' }}>
                            We provide the best platform for job seekers and recruiters to connect and find the perfect match.
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <AnimatedSection key={index} animation="tilt-in" delay={index * 120}>
                                <div className="card card-tilt p-7 text-center group hover:border-emerald-500/50 transition-all duration-500 h-full">
                                    <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg group-hover:shadow-xl transition-all duration-400 group-hover:scale-110 icon-hover-bounce`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-3 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feature.description}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #111827 0%, #064e3b 50%, #111827 100%)' }}>
                <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px] float"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-600/20 rounded-full blur-[100px] float-rotate"></div>

                <AnimatedSection animation="scale-in" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30 float glow-ring">
                            <FaShieldAlt className="text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Ready to Start Your Journey?</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                        Join thousands of students and recruiters who have found their perfect match through JobPortal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register" className="btn btn-primary btn-ripple text-lg px-8 py-4">Create Free Account</Link>
                        <Link to="/jobs" className="btn btn-outline border-white/30 text-white hover:bg-white hover:text-gray-900 hover:border-white btn-ripple">Browse Jobs</Link>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    );
};

export default Home;
