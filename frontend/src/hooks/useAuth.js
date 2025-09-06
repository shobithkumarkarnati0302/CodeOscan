import { useEffect, useState, useCallback } from 'react';
import api from '../api/client';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    // If we have stored user data, use it immediately for faster UI updates
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }

    try {
      const { data } = await api.get('/api/auth/me');
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch {
      // invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
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
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, loading, loadUser, logout, isAuthenticated: !!user };
}
