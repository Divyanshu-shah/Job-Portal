const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
const getAllUsers = async (req, res) => {
    try {
        const { role, isApproved, page = 1, limit = 20 } = req.query;

        let query = {};

        if (role) {
            query.role = role;
        }

        if (isApproved !== undefined) {
            query.isApproved = isApproved === 'true';
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await User.countDocuments(query);

        res.json({
            users,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get pending recruiters
// @route   GET /api/admin/recruiters/pending
// @access  Private (Admin only)
const getPendingRecruiters = async (req, res) => {
    try {
        const recruiters = await User.find({ role: 'recruiter', isApproved: false })
            .select('-password')
            .sort({ createdAt: -1 });

        res.json(recruiters);
    } catch (error) {
        console.error('Get pending recruiters error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Approve recruiter
// @route   PUT /api/admin/recruiters/:id/approve
// @access  Private (Admin only)
const approveRecruiter = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'recruiter') {
            return res.status(400).json({ message: 'User is not a recruiter' });
        }

        user.isApproved = true;
        await user.save();

        res.json({ message: 'Recruiter approved successfully', user });
    } catch (error) {
        console.error('Approve recruiter error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Reject/Delete recruiter
// @route   DELETE /api/admin/recruiters/:id/reject
// @access  Private (Admin only)
const rejectRecruiter = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'recruiter') {
            return res.status(400).json({ message: 'User is not a recruiter' });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'Recruiter rejected and deleted successfully' });
    } catch (error) {
        console.error('Reject recruiter error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent deleting admin users
        if (user.role === 'admin') {
            return res.status(400).json({ message: 'Cannot delete admin users' });
        }

        // If recruiter, delete their jobs and related applications
        if (user.role === 'recruiter') {
            const recruiterJobs = await Job.find({ postedBy: user._id });
            const jobIds = recruiterJobs.map(job => job._id);

            await Application.deleteMany({ job: { $in: jobIds } });
            await Job.deleteMany({ postedBy: user._id });
        }

        // If student, delete their applications
        if (user.role === 'student') {
            await Application.deleteMany({ student: user._id });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin only)
const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalRecruiters = await User.countDocuments({ role: 'recruiter' });
        const pendingRecruiters = await User.countDocuments({ role: 'recruiter', isApproved: false });
        const totalJobs = await Job.countDocuments();
        const activeJobs = await Job.countDocuments({ isActive: true });
        const totalApplications = await Application.countDocuments();

        // Get recent activity
        const recentUsers = await User.find()
            .select('name email role createdAt')
            .sort({ createdAt: -1 })
            .limit(5);

        const recentJobs = await Job.find()
            .select('title company createdAt')
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            stats: {
                totalUsers,
                totalStudents,
                totalRecruiters,
                pendingRecruiters,
                totalJobs,
                activeJobs,
                totalApplications
            },
            recentUsers,
            recentJobs
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getPendingRecruiters,
    approveRecruiter,
    rejectRecruiter,
    deleteUser,
    getStats
};
