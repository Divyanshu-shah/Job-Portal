const express = require('express');
const {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    getRecruiterJobs
} = require('../controllers/jobController');
const { protect, authorize, checkApproved } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllJobs);
router.get('/recruiter/my-jobs', protect, authorize('recruiter', 'admin'), checkApproved, getRecruiterJobs);
router.get('/:id', getJobById);
router.post('/', protect, authorize('recruiter', 'admin'), checkApproved, createJob);
router.put('/:id', protect, authorize('recruiter', 'admin'), checkApproved, updateJob);
router.delete('/:id', protect, authorize('recruiter', 'admin'), checkApproved, deleteJob);

module.exports = router;
