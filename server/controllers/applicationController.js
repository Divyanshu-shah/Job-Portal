const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Student only)
const applyForJob = async (req, res) => {
    try {
        const { jobId, coverLetter } = req.body;

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if job is active
        if (!job.isActive) {
            return res.status(400).json({ message: 'This job is no longer accepting applications' });
        }

        // Check if already applied
        const existingApplication = await Application.findOne({
            job: jobId,
            student: req.user._id
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        // Check if resume was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload your resume' });
        }

        const application = await Application.create({
            job: jobId,
            student: req.user._id,
            resume: req.file.path,
            coverLetter
        });

        // Increment application count on job
        await Job.findByIdAndUpdate(jobId, { $inc: { applicationsCount: 1 } });

        const populatedApplication = await Application.findById(application._id)
            .populate('job', 'title company location')
            .populate('student', 'name email');

        res.status(201).json(populatedApplication);
    } catch (error) {
        console.error('Apply for job error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get applications by student
// @route   GET /api/applications/my-applications
// @access  Private (Student only)
const getStudentApplications = async (req, res) => {
    try {
        const applications = await Application.find({ student: req.user._id })
            .populate('job', 'title company location salary jobType')
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        console.error('Get student applications error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get applications for a job
// @route   GET /api/applications/job/:jobId
// @access  Private (Recruiter only)
const getJobApplications = async (req, res) => {
    try {
        // Verify the recruiter owns this job
        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view these applications' });
        }

        const applications = await Application.find({ job: req.params.jobId })
            .populate('student', 'name email phone skills')
            .populate('job', 'title company')
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        console.error('Get job applications error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Recruiter only)
const updateApplicationStatus = async (req, res) => {
    try {
        const { status, notes } = req.body;

        const application = await Application.findById(req.params.id)
            .populate('job');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Verify the recruiter owns the job
        if (application.job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this application' });
        }

        // Validate status
        const validStatuses = ['Applied', 'Reviewed', 'Shortlisted', 'Accepted', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        application.status = status;
        if (notes) {
            application.notes = notes;
        }

        await application.save();

        const updatedApplication = await Application.findById(req.params.id)
            .populate('student', 'name email phone skills')
            .populate('job', 'title company');

        res.json(updatedApplication);
    } catch (error) {
        console.error('Update application status error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('student', 'name email phone skills bio')
            .populate('job', 'title company location salary description');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Check authorization
        const isOwner = application.student._id.toString() === req.user._id.toString();
        const isRecruiter = await Job.findOne({
            _id: application.job._id,
            postedBy: req.user._id
        });

        if (!isOwner && !isRecruiter && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view this application' });
        }

        res.json(application);
    } catch (error) {
        console.error('Get application by ID error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all applications for recruiter's jobs
// @route   GET /api/applications/recruiter
// @access  Private (Recruiter only)
const getRecruiterApplications = async (req, res) => {
    try {
        // Get all jobs posted by recruiter
        const recruiterJobs = await Job.find({ postedBy: req.user._id }).select('_id');
        const jobIds = recruiterJobs.map(job => job._id);

        // Get all applications for these jobs
        const applications = await Application.find({ job: { $in: jobIds } })
            .populate('student', 'name email phone skills')
            .populate('job', 'title company location')
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        console.error('Get recruiter applications error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    applyForJob,
    getStudentApplications,
    getJobApplications,
    updateApplicationStatus,
    getApplicationById,
    getRecruiterApplications
};
