import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import ProtectedRoute from '../components/ProtectedRoute';
import useAuth from '../hooks/useAuth';

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/share/:analysisId" element={<Share />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
