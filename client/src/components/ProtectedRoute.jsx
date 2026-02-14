import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check role-based access
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard
        const dashboardRoutes = {
            student: '/student/dashboard',
            recruiter: '/recruiter/dashboard',
            admin: '/admin/dashboard'
        };
        return <Navigate to={dashboardRoutes[user.role] || '/'} replace />;
    }

    return children;
};

export default ProtectedRoute;
