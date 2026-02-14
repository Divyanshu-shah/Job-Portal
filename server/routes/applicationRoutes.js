const express = require('express');
const {
    applyForJob,
    getStudentApplications,
    getJobApplications,
    updateApplicationStatus,
    getApplicationById,
    getRecruiterApplications
} = require('../controllers/applicationController');
const { protect, authorize, checkApproved } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', protect, authorize('student', 'admin'), upload.single('resume'), applyForJob);
router.get('/my-applications', protect, authorize('student', 'admin'), getStudentApplications);
router.get('/recruiter', protect, authorize('recruiter', 'admin'), checkApproved, getRecruiterApplications);
router.get('/job/:jobId', protect, authorize('recruiter', 'admin'), checkApproved, getJobApplications);
router.put('/:id/status', protect, authorize('recruiter', 'admin'), checkApproved, updateApplicationStatus);
router.get('/:id', protect, getApplicationById);

module.exports = router;
