const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then((conn) => console.log(`MongoDB Connected to: ${conn.connection.name}`))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema (inline for seeding)
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['student', 'recruiter', 'admin'] },
    isApproved: { type: Boolean, default: true },
    company: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Job Schema
const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    salary: String,
    description: String,
    requirements: [String],
    jobType: String,
    experience: String,
    skills: [String],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Job.deleteMany({});
        console.log('Cleared existing data');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        // Create Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin',
            isApproved: true
        });
        console.log('Created admin:', admin.email);

        // Create Recruiter
        const recruiter = await User.create({
            name: 'John Recruiter',
            email: 'recruiter@example.com',
            password: hashedPassword,
            role: 'recruiter',
            company: 'Tech Corp',
            isApproved: true
        });
        console.log('Created recruiter:', recruiter.email);

        // Create Student
        const student = await User.create({
            name: 'Jane Student',
            email: 'student@example.com',
            password: hashedPassword,
            role: 'student',
            isApproved: true
        });
        console.log('Created student:', student.email);

        // Create Sample Jobs
        const jobs = [
            {
                title: 'Senior Frontend Developer',
                company: 'Tech Corp',
                location: 'New York, NY',
                salary: '₹12,00,000 - ₹15,00,000',
                description: 'We are looking for a Senior Frontend Developer to join our team. You will be responsible for building and maintaining our web applications using React and modern JavaScript.',
                requirements: ['5+ years of experience with React', 'Strong TypeScript skills', 'Experience with state management'],
                jobType: 'full-time',
                experience: '5+ years',
                skills: ['React', 'TypeScript', 'Redux', 'CSS', 'Node.js'],
                postedBy: recruiter._id
            },
            {
                title: 'Backend Engineer',
                company: 'Tech Corp',
                location: 'San Francisco, CA',
                salary: '₹14,00,000 - ₹18,00,000',
                description: 'Join our backend team to build scalable APIs and services using Node.js and MongoDB. You will work on critical infrastructure that powers our platform.',
                requirements: ['3+ years Node.js experience', 'MongoDB expertise', 'REST API design'],
                jobType: 'full-time',
                experience: '2-5 years',
                skills: ['Node.js', 'MongoDB', 'Express', 'Docker', 'AWS'],
                postedBy: recruiter._id
            },
            {
                title: 'Full Stack Developer Intern',
                company: 'Tech Corp',
                location: 'Remote',
                salary: '₹15,000 - ₹25,000 per month',
                description: 'Great opportunity for students! Learn and grow with our experienced team while working on real projects.',
                requirements: ['Currently pursuing CS degree', 'Basic JavaScript knowledge', 'Enthusiasm to learn'],
                jobType: 'internship',
                experience: 'fresher',
                skills: ['JavaScript', 'HTML', 'CSS', 'Git'],
                postedBy: recruiter._id
            },
            {
                title: 'DevOps Engineer',
                company: 'Tech Corp',
                location: 'Austin, TX',
                salary: '₹10,00,000 - ₹14,00,000',
                description: 'We need a DevOps engineer to manage our cloud infrastructure and CI/CD pipelines.',
                requirements: ['AWS/GCP experience', 'Kubernetes knowledge', 'CI/CD pipeline experience'],
                jobType: 'full-time',
                experience: '2-5 years',
                skills: ['AWS', 'Kubernetes', 'Docker', 'Jenkins', 'Terraform'],
                postedBy: recruiter._id
            },
            {
                title: 'UI/UX Designer',
                company: 'Tech Corp',
                location: 'Los Angeles, CA',
                salary: '₹8,00,000 - ₹12,00,000',
                description: 'Design beautiful and intuitive user interfaces for our web and mobile applications.',
                requirements: ['3+ years design experience', 'Figma proficiency', 'Portfolio required'],
                jobType: 'full-time',
                experience: '2-5 years',
                skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping', 'User Research'],
                postedBy: recruiter._id
            },
            {
                title: 'Senior Backend Engineer',
                company: 'Cloud Scale Inc',
                location: 'Austin, TX (Remote)',
                salary: '₹16,00,000 - ₹22,00,000',
                description: 'Lead the architectural design of our microservices and ensure the scalability of our core API infrastructure.',
                requirements: ['6+ years of Node.js experience', 'Deep understanding of System Design', 'Experience with Kubernetes'],
                jobType: 'full-time',
                experience: '6+ years',
                skills: ['Node.js', 'Go', 'AWS', 'Docker', 'PostgreSQL'],
                postedBy: recruiter._id
            },
            {
                title: 'Mobile App Developer',
                company: 'SwiftApp Solutions',
                location: 'San Francisco, CA',
                salary: '₹10,00,000 - ₹15,00,000',
                description: 'Join our mobile team to build high-performance, native-like experiences using Flutter for both iOS and Android platforms.',
                requirements: ['3+ years in Mobile Dev', 'Proven Flutter/Dart track record', 'Familiarity with CI/CD pipelines'],
                jobType: 'full-time',
                experience: '3+ years',
                skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'Git'],
                postedBy: recruiter._id
            },
            {
                title: 'DevOps Specialist',
                company: 'SecureNet Systems',
                location: 'Washington, DC',
                salary: '₹13,00,000 - ₹18,00,000',
                description: 'Automate our deployment processes and manage our cloud infrastructure with a focus on security and reliability.',
                requirements: ['Experience with IaC (Terraform)', 'Strong Linux administration', 'Knowledge of security best practices'],
                jobType: 'full-time',
                experience: '4+ years',
                skills: ['Terraform', 'Jenkins', 'Azure', 'Python', 'Security'],
                postedBy: recruiter._id
            },
            {
                title: 'Junior Full Stack Developer',
                company: 'Startup Launchpad',
                location: 'Remote',
                salary: '₹6,00,000 - ₹10,00,000',
                description: 'A great opportunity for an early-career dev to touch every part of the stack, from database design to UI implementation.',
                requirements: ['Completed CS degree or Bootcamp', 'Solid MERN stack foundation', 'Eagerness to learn and adapt'],
                jobType: 'full-time',
                experience: '0-2 years',
                skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript'],
                postedBy: recruiter._id
            },
            {
                title: 'QA Automation Engineer',
                company: 'QualityFirst Labs',
                location: 'Chicago, IL (Hybrid)',
                salary: '₹9,00,000 - ₹13,00,000',
                description: 'Develop and execute automated test suites to ensure our software meets the highest standards before shipping.',
                requirements: ['Expertise in Cypress or Selenium', 'Ability to write clean test code', 'Experience in Agile environments'],
                jobType: 'full-time',
                experience: '3+ years',
                skills: ['Cypress', 'JavaScript', 'SQL', 'Jira', 'Postman'],
                postedBy: recruiter._id
            }
        ];

        await Job.insertMany(jobs);
        console.log(`Created ${jobs.length} sample jobs`);

        console.log('\n✅ Seed completed successfully!');
        console.log('\nTest Credentials:');
        console.log('Admin: admin@example.com / password123');
        console.log('Recruiter: recruiter@example.com / password123');
        console.log('Student: student@example.com / password123');

        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
};

seedData();
