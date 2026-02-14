const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a job title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Please provide job location'],
        trim: true
    },
    salary: {
        type: String,
        required: [true, 'Please provide salary information']
    },
    description: {
        type: String,
        required: [true, 'Please provide job description'],
        maxlength: [5000, 'Description cannot be more than 5000 characters']
    },
    requirements: [{
        type: String,
        trim: true
    }],
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
        default: 'full-time'
    },
    experience: {
        type: String,
        enum: ['fresher', '1-2 years', '2-5 years', '5+ years'],
        default: 'fresher'
    },
    skills: [{
        type: String,
        trim: true
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    applicationDeadline: {
        type: Date
    },
    applicationsCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for search functionality
jobSchema.index({ title: 'text', company: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Job', jobSchema);
