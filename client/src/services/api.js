import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});


// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/profile', data)
};

// Jobs API
export const jobsAPI = {
    getAll: (params) => api.get('/jobs', { params }),
    getById: (id) => api.get(`/jobs/${id}`),
    create: (data) => api.post('/jobs', data),
    update: (id, data) => api.put(`/jobs/${id}`, data),
    delete: (id) => api.delete(`/jobs/${id}`),
    getRecruiterJobs: () => api.get('/jobs/recruiter/my-jobs')
};

// Applications API
export const applicationsAPI = {
    apply: (data) => {
        const formData = new FormData();
        formData.append('jobId', data.jobId);
        formData.append('resume', data.resume);
        if (data.coverLetter) {
            formData.append('coverLetter', data.coverLetter);
        }
        return api.post('/applications', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    getStudentApplications: () => api.get('/applications/my-applications'),
    getJobApplications: (jobId) => api.get(`/applications/job/${jobId}`),
    getRecruiterApplications: () => api.get('/applications/recruiter'),
    updateStatus: (id, data) => api.put(`/applications/${id}/status`, data),
    getById: (id) => api.get(`/applications/${id}`)
};

// Admin API
export const adminAPI = {
    getStats: () => api.get('/admin/stats'),
    getUsers: (params) => api.get('/admin/users', { params }),
    getPendingRecruiters: () => api.get('/admin/recruiters/pending'),
    approveRecruiter: (id) => api.put(`/admin/recruiters/${id}/approve`),
    rejectRecruiter: (id) => api.delete(`/admin/recruiters/${id}/reject`),
    deleteUser: (id) => api.delete(`/admin/users/${id}`)
};

export default api;
