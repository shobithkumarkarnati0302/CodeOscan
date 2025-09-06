import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ isAuthenticated, loading, children }) {
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin h-10 w-10 border-2 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
