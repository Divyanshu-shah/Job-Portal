import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import AnimatedSection from '../components/AnimatedSection';
import CountUp from '../components/CountUp';
import { FaUsers, FaBriefcase, FaCheckCircle, FaTimesCircle, FaTrash, FaUserGraduate, FaUserTie, FaShieldAlt, FaClock } from 'react-icons/fa';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStudents: 0,
        totalRecruiters: 0,
        totalJobs: 0
    });
    const [pendingRecruiters, setPendingRecruiters] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, pendingRes, usersRes] = await Promise.all([
                adminAPI.getStats(),
                adminAPI.getPendingRecruiters(),
                adminAPI.getAllUsers()
            ]);
            setStats(statsRes.data);
            setPendingRecruiters(pendingRes.data);
            setAllUsers(usersRes.data);
        } catch (err) {
            console.error('Failed to fetch admin data:', err);
        }
        setLoading(false);
    };

    const approveRecruiter = async (id) => {
        try {
            await adminAPI.approveRecruiter(id);
            setPendingRecruiters(pendingRecruiters.filter(r => r._id !== id));
            fetchData();
        } catch (err) {
            console.error('Failed to approve recruiter:', err);
        }
    };

    const rejectRecruiter = async (id) => {
        try {
            await adminAPI.rejectRecruiter(id);
            setPendingRecruiters(pendingRecruiters.filter(r => r._id !== id));
        } catch (err) {
            console.error('Failed to reject recruiter:', err);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await adminAPI.deleteUser(id);
                setAllUsers(allUsers.filter(u => u._id !== id));
                fetchData();
            } catch (err) {
                console.error('Failed to delete user:', err);
            }
        }
    };

    const getRoleBadge = (role) => {
        const styles = {
            student: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
            recruiter: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
            admin: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
        };
        return styles[role] || '';
    };

    const statItems = [
        { value: stats.totalUsers, label: 'Total Users', icon: <FaUsers className="text-3xl text-emerald-300" />, gradient: 'from-emerald-500 to-teal-600' },
        { value: stats.totalStudents, label: 'Students', icon: <FaUserGraduate className="text-3xl text-cyan-300" />, gradient: 'from-cyan-500 to-blue-600' },
        { value: stats.totalRecruiters, label: 'Recruiters', icon: <FaUserTie className="text-3xl text-amber-300" />, gradient: 'from-amber-500 to-orange-600' },
        { value: stats.totalJobs, label: 'Total Jobs', icon: <FaBriefcase className="text-3xl text-emerald-300" />, gradient: 'from-emerald-500 to-teal-600' },
    ];

    if (loading) {
        return (
            <div className="page-container flex items-center justify-center min-h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="page-container min-h-screen" style={{ background: 'var(--bg-tertiary)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <AnimatedSection animation="blur-in" className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg icon-hover-bounce">
                            <FaShieldAlt />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                            Admin Dashboard
                        </h1>
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage users, recruiters, and platform activity.</p>
                </AnimatedSection>

                {/* Stats */}
                <AnimatedSection animation="fade-in-up" stagger className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {statItems.map((item, index) => (
                        <div key={index} className="stat-card card-tilt">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="stat-card-value">{item.value}</p>
                                    <p className="stat-card-label">{item.label}</p>
                                </div>
                                {item.icon}
                            </div>
                        </div>
                    ))}
                </AnimatedSection>

                {/* Tabs */}
                <AnimatedSection animation="slide-in-left" delay={200} className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 btn-ripple ${activeTab === 'pending'
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                            : ''
                            }`}
                        style={activeTab !== 'pending' ? { background: 'var(--card-bg)', color: 'var(--text-secondary)', border: '1px solid var(--card-border)' } : {}}
                    >
                        Pending Approvals
                        {pendingRecruiters.length > 0 && (
                            <span className="ml-2 w-6 h-6 inline-flex items-center justify-center bg-red-500 text-white text-xs rounded-full font-bold glow-ring">
                                {pendingRecruiters.length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 btn-ripple ${activeTab === 'users'
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                            : ''
                            }`}
                        style={activeTab !== 'users' ? { background: 'var(--card-bg)', color: 'var(--text-secondary)', border: '1px solid var(--card-border)' } : {}}
                    >
                        All Users
                    </button>
                </AnimatedSection>

                {/* Pending Approvals Tab */}
                {activeTab === 'pending' && (
                    <div className="card fade-in">
                        <div className="p-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                                <FaClock className="text-amber-500" /> Pending Recruiter Approvals
                            </h2>
                        </div>

                        {pendingRecruiters.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center" style={{ background: 'var(--bg-tertiary)' }}>
                                    <FaCheckCircle className="text-3xl text-emerald-500" />
                                </div>
                                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>All Clear!</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>No pending recruiter approvals.</p>
                            </div>
                        ) : (
                            <div>
                                {pendingRecruiters.map((recruiter, index) => (
                                    <div
                                        key={recruiter._id}
                                        className="p-6 transition-all duration-300 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10"
                                        style={{ borderBottom: index < pendingRecruiters.length - 1 ? '1px solid var(--border-color)' : 'none' }}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg">
                                                    {recruiter.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{recruiter.name}</p>
                                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{recruiter.email}</p>
                                                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Company: <strong>{recruiter.company}</strong></p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => approveRecruiter(recruiter._id)}
                                                    className="btn btn-success text-sm py-2 px-4 flex items-center gap-2"
                                                >
                                                    <FaCheckCircle /> Approve
                                                </button>
                                                <button
                                                    onClick={() => rejectRecruiter(recruiter._id)}
                                                    className="btn btn-danger text-sm py-2 px-4 flex items-center gap-2"
                                                >
                                                    <FaTimesCircle /> Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* All Users Tab */}
                {activeTab === 'users' && (
                    <div className="card fade-in overflow-x-auto">
                        <div className="p-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>All Users</h2>
                        </div>

                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr style={{ background: 'var(--bg-tertiary)' }}>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>User</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Role</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Status</th>
                                    <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.map((u, index) => (
                                    <tr
                                        key={u._id}
                                        className="transition-all duration-300 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10"
                                        style={{ borderBottom: index < allUsers.length - 1 ? '1px solid var(--border-color)' : 'none' }}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                    {u.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{u.name}</p>
                                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`badge ${getRoleBadge(u.role)}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {u.role === 'recruiter' && (
                                                <span className={`badge ${u.isApproved ? 'badge-accepted' : 'badge-reviewed'}`}>
                                                    {u.isApproved ? 'Approved' : 'Pending'}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {u.role !== 'admin' && (
                                                <button
                                                    onClick={() => deleteUser(u._id)}
                                                    className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    title="Delete User"
                                                >
                                                    <FaTrash />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
