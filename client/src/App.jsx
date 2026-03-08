import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import StudentDashboard from './pages/StudentDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PostJob from './pages/PostJob';


import BackgroundAnimation from './components/BackgroundAnimation';

/* Layout wrapper: hides default footer on landing page (it has its own) */
function AppLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <>
      <BackgroundAnimation />
      <div className="flex flex-col min-h-screen relative z-0">
        <Navbar />
        <main className={isLanding ? '' : 'flex-grow'}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />

            {/* Student Routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            {/* Recruiter Routes */}
            <Route
              path="/recruiter/dashboard"
              element={
                <ProtectedRoute allowedRoles={['recruiter']}>
                  <RecruiterDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/post-job"
              element={
                <ProtectedRoute allowedRoles={['recruiter']}>
                  <PostJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/pending"
              element={
                <ProtectedRoute allowedRoles={['recruiter']}>
                  <RecruiterDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route
              path="*"
              element={
                <div className="page-container flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <div className="text-center">
                    <h1 className="text-6xl font-bold mb-4" style={{ color: 'var(--text-muted)' }}>404</h1>
                    <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>Page not found</p>
                    <a href="/" className="btn btn-primary">Go Home</a>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
        {!isLanding && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <SmoothScroll>
            <AppLayout />
          </SmoothScroll>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

