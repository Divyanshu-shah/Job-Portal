const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getAllJobs = async (req, res) => {
    try {
        const { search, location, jobType, experience, page = 1, limit = 10 } = req.query;

        // Build query
        let query = { isActive: true };

        // Search by title, company, or description
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by location
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        // Filter by job type
        if (jobType) {
            query.jobType = jobType;
        }

        // Filter by experience
        if (experience) {
            query.experience = experience;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const jobs = await Job.find(query)
            .populate('postedBy', 'name company')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Job.countDocuments(query);

        res.json({
            jobs,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total
        });
    } catch (error) {
        console.error('Get all jobs error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('postedBy', 'name company email');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        console.error('Get job by ID error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private (Recruiter only)
const createJob = async (req, res) => {
    try {
        const { title, company, location, salary, description, requirements, jobType, experience, skills, applicationDeadline } = req.body;

        const job = await Job.create({
            title,
            company: company || req.user.company,
            location,
            salary,
            description,
            requirements: requirements || [],
            jobType: jobType || 'full-time',
            experience: experience || 'fresher',
            skills: skills || [],
            applicationDeadline,
            postedBy: req.user._id
        });

        const populatedJob = await Job.findById(job._id).populate('postedBy', 'name company');

        res.status(201).json(populatedJob);
    } catch (error) {
        console.error('Create job error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private (Recruiter only - own jobs)
const updateJob = async (req, res) => {
    try {
        let job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Make sure user is the job owner
        if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this job' });
        }

        job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('postedBy', 'name company');

        res.json(job);
    } catch (error) {
        console.error('Update job error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private (Recruiter only - own jobs)
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Make sure user is the job owner
        if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this job' });
        }

        // Delete all applications for this job
        await Application.deleteMany({ job: req.params.id });

        await Job.findByIdAndDelete(req.params.id);

        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Delete job error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get jobs posted by recruiter
// @route   GET /api/jobs/my-jobs
// @access  Private (Recruiter only)
const getRecruiterJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user._id })
            .sort({ createdAt: -1 });

        // Get application counts for each job
        const jobsWithCounts = await Promise.all(
            jobs.map(async (job) => {
                const count = await Application.countDocuments({ job: job._id });
                return {
                    ...job.toObject(),
                    applicationsCount: count
                };
            })
        );

        res.json(jobsWithCounts);
    } catch (error) {
        console.error('Get recruiter jobs error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    getRecruiterJobs
};
