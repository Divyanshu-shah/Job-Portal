const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resume: {
        type: String,
        required: [true, 'Please upload your resume']
    },
    coverLetter: {
        type: String,
        maxlength: [2000, 'Cover letter cannot be more than 2000 characters']
    },
    status: {
        type: String,
        enum: ['Applied', 'Reviewed', 'Shortlisted', 'Accepted', 'Rejected'],
        default: 'Applied'
    },
    notes: {
        type: String, // Recruiter notes
        maxlength: [1000, 'Notes cannot be more than 1000 characters']
    }
}, {
    timestamps: true
});

// Ensure a student can only apply once to a job
applicationSchema.index({ job: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
