import { useEffect, useState, useCallback } from 'react';
import api from '../api/client';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get('/api/auth/me');
      setUser(data);
    } catch {
      // invalid token
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, loadUser, logout, isAuthenticated: !!user };
}
