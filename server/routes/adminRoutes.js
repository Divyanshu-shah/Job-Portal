const express = require('express');
const {
    getAllUsers,
    getPendingRecruiters,
    approveRecruiter,
    rejectRecruiter,
    deleteUser,
    getStats
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/recruiters/pending', getPendingRecruiters);
router.put('/recruiters/:id/approve', approveRecruiter);
router.delete('/recruiters/:id/reject', rejectRecruiter);

module.exports = router;
