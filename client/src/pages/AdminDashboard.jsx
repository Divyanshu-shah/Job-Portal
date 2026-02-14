import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaUsers, FaBriefcase, FaUserTie, FaFileAlt, FaCheck, FaTimes, FaTrash, FaClock } from 'react-icons/fa';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [pendingRecruiters, setPendingRecruiters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [userFilter, setUserFilter] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, usersRes, pendingRes] = await Promise.all([
                adminAPI.getStats(),
                adminAPI.getUsers(),
                adminAPI.getPendingRecruiters()
            ]);
            setStats(statsRes.data);
            setUsers(usersRes.data.users);
            setPendingRecruiters(pendingRes.data);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        }
        setLoading(false);
    };

    const handleApproveRecruiter = async (id) => {
        try {
            await adminAPI.approveRecruiter(id);
            fetchData();
        } catch (err) {
            console.error('Failed to approve recruiter:', err);
        }
    };

    const handleRejectRecruiter = async (id) => {
        if (!window.confirm('Are you sure you want to reject this recruiter?')) return;
        try {
            await adminAPI.rejectRecruiter(id);
            fetchData();
        } catch (err) {
            console.error('Failed to reject recruiter:', err);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await adminAPI.deleteUser(id);
            fetchData();
        } catch (err) {
            console.error('Failed to delete user:', err);
        }
    };

    const filteredUsers = users.filter(u =>
        !userFilter || u.role === userFilter
    );

    if (loading) {
        return (
            <div className="page-container flex items-center justify-center min-h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="page-container bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Admin <span className="gradient-text">Dashboard</span>
                    </h1>
                    <p className="text-gray-600 mt-1">Welcome, {user?.name}</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-card-value">{stats?.stats?.totalUsers}</p>
                                <p className="stat-card-label">Total Users</p>
                            </div>
                            <FaUsers className="text-3xl text-indigo-200" />
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-card-value text-blue-600">{stats?.stats?.totalStudents}</p>
                                <p className="stat-card-label">Students</p>
                            </div>
                            <FaUsers className="text-3xl text-blue-200" />
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-card-value text-green-600">{stats?.stats?.totalRecruiters}</p>
                                <p className="stat-card-label">Recruiters</p>
                            </div>
                            <FaUserTie className="text-3xl text-green-200" />
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="stat-card-value text-purple-600">{stats?.stats?.totalJobs}</p>
                                <p className="stat-card-label">Total Jobs</p>
                            </div>
                            <FaBriefcase className="text-3xl text-purple-200" />
                        </div>
                    </div>
                </div>

                {/* Pending Recruiters Alert */}
                {pendingRecruiters.length > 0 && (
                    <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center gap-4">
                        <FaClock className="text-2xl text-yellow-500" />
                        <div className="flex-1">
                            <p className="font-semibold text-yellow-800">
                                {pendingRecruiters.length} recruiter(s) pending approval
                            </p>
                            <p className="text-yellow-700 text-sm">Review and approve new recruiter accounts.</p>
                        </div>
                        <button
                            onClick={() => setActiveTab('pending')}
                            className="btn btn-primary text-sm"
                        >
                            Review Now
                        </button>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'overview'
                                ? 'text-indigo-600 border-b-2 border-indigo-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`pb-4 px-2 font-medium transition-colors flex items-center gap-2 ${activeTab === 'pending'
                                ? 'text-indigo-600 border-b-2 border-indigo-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Pending Recruiters
                        {pendingRecruiters.length > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {pendingRecruiters.length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'users'
                                ? 'text-indigo-600 border-b-2 border-indigo-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        All Users
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Recent Users */}
                        <div className="card">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">Recent Users</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {stats?.recentUsers?.map((u) => (
                                    <div key={u._id} className="p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">{u.name}</p>
                                            <p className="text-sm text-gray-500">{u.email}</p>
                                        </div>
                                        <span className={`badge ${u.role === 'student' ? 'bg-blue-100 text-blue-800' :
                                                u.role === 'recruiter' ? 'bg-green-100 text-green-800' :
                                                    'bg-purple-100 text-purple-800'
                                            }`}>
                                            {u.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Jobs */}
                        <div className="card">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">Recent Jobs</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {stats?.recentJobs?.map((job) => (
                                    <div key={job._id} className="p-4">
                                        <p className="font-medium text-gray-900">{job.title}</p>
                                        <p className="text-sm text-gray-500">{job.company}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'pending' && (
                    <div className="card">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-900">Pending Recruiter Approvals</h3>
                        </div>
                        {pendingRecruiters.length === 0 ? (
                            <div className="text-center py-12">
                                <FaCheck className="text-5xl text-green-300 mx-auto mb-4" />
                                <p className="text-gray-500">No pending approvals!</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {pendingRecruiters.map((recruiter) => (
                                    <div key={recruiter._id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{recruiter.name}</h4>
                                            <p className="text-gray-500 text-sm">{recruiter.email}</p>
                                            <p className="text-gray-500 text-sm">Company: {recruiter.company}</p>
                                            <p className="text-gray-400 text-xs">
                                                Registered: {new Date(recruiter.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleApproveRecruiter(recruiter._id)}
                                                className="btn btn-success flex items-center gap-2"
                                            >
                                                <FaCheck /> Approve
                                            </button>
                                            <button
                                                onClick={() => handleRejectRecruiter(recruiter._id)}
                                                className="btn btn-danger flex items-center gap-2"
                                            >
                                                <FaTimes /> Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="card">
                        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h3 className="font-semibold text-gray-900">All Users</h3>
                            <select
                                value={userFilter}
                                onChange={(e) => setUserFilter(e.target.value)}
                                className="input-field w-auto"
                            >
                                <option value="">All Roles</option>
                                <option value="student">Students</option>
                                <option value="recruiter">Recruiters</option>
                                <option value="admin">Admins</option>
                            </select>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredUsers.map((u) => (
                                        <tr key={u._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{u.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`badge ${u.role === 'student' ? 'bg-blue-100 text-blue-800' :
                                                        u.role === 'recruiter' ? 'bg-green-100 text-green-800' :
                                                            'bg-purple-100 text-purple-800'
                                                    }`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {u.isApproved ? (
                                                    <span className="badge bg-green-100 text-green-800">Approved</span>
                                                ) : (
                                                    <span className="badge bg-yellow-100 text-yellow-800">Pending</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {u.role !== 'admin' && (
                                                    <button
                                                        onClick={() => handleDeleteUser(u._id)}
                                                        className="text-red-500 hover:text-red-700"
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
