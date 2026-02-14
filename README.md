# Job Portal Web Application

A full-stack MERN (MongoDB, Express, React, Node.js) job portal where students can browse and apply for jobs, recruiters can post and manage jobs, and admins can manage users.

## Features

### For Students
- Browse and search jobs with filters (location, job type, experience)
- Apply for jobs with resume upload (PDF)
- Track application status (Applied, Reviewed, Shortlisted, Accepted, Rejected)
- View application history

### For Recruiters
- Post new job listings
- Manage posted jobs
- Review applications
- Update application status
- View candidate resumes

### For Admin
- View platform statistics
- Approve/reject recruiter registrations
- Manage all users
- View recent activity

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcrypt
- **File Upload:** Multer

## Project Structure

```
job-portal/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # Auth context
│   │   ├── pages/          # Page components
│   │   └── services/       # API services
│   └── package.json
│
└── server/                 # Node.js Backend
    ├── config/             # Database config
    ├── controllers/        # Route handlers
    ├── middleware/         # Auth & upload middleware
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    ├── uploads/            # Resume uploads
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone and Install

```bash
# Navigate to project
cd job-portal

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Variables

Create `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/job-portal
JWT_SECRET=your_secret_key_here
```

### 3. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job (Recruiter)
- `PUT /api/jobs/:id` - Update job (Recruiter)
- `DELETE /api/jobs/:id` - Delete job (Recruiter)

### Applications
- `POST /api/applications` - Apply for job (Student)
- `GET /api/applications/my-applications` - Get student's applications
- `GET /api/applications/job/:jobId` - Get job applications (Recruiter)
- `PUT /api/applications/:id/status` - Update status (Recruiter)

### Admin
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/recruiters/pending` - Get pending recruiters
- `PUT /api/admin/recruiters/:id/approve` - Approve recruiter
- `DELETE /api/admin/recruiters/:id/reject` - Reject recruiter
- `DELETE /api/admin/users/:id` - Delete user

## Default Test Accounts

After starting the application, register these accounts for testing:

1. **Admin**
   - Register a user with role "student"
   - Manually update role to "admin" in MongoDB

2. **Student**
   - Register with role "Student"

3. **Recruiter**
   - Register with role "Recruiter"
   - Wait for admin approval

## License

MIT
