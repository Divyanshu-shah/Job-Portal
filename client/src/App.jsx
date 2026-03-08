import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';

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
          <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
            <Route path="/jobs" element={<PageTransition><Jobs /></PageTransition>} />
            <Route path="/jobs/:id" element={<PageTransition><JobDetails /></PageTransition>} />

            {/* Student Routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <PageTransition><StudentDashboard /></PageTransition>
                </ProtectedRoute>
              }
            />

            {/* Recruiter Routes */}
            <Route
              path="/recruiter/dashboard"
              element={
                <ProtectedRoute allowedRoles={['recruiter']}>
                  <PageTransition><RecruiterDashboard /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/post-job"
              element={
                <ProtectedRoute allowedRoles={['recruiter']}>
                  <PageTransition><PostJob /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/pending"
              element={
                <ProtectedRoute allowedRoles={['recruiter']}>
                  <PageTransition><RecruiterDashboard /></PageTransition>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <PageTransition><AdminDashboard /></PageTransition>
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
          </AnimatePresence>
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

