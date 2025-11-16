import { useState,  useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create a context
const AuthContext = createContext();
const API_URL = 'http://localhost:5000/api'; // ✅ your backend base URL

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });
  const [loading, setLoading] = useState(false);

  // Register
  const signup = async (email, password, fullName) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        fullName,
        email,
        password,
        phone: 'N/A',
        address: 'N/A',
        businessName: fullName + "'s Hostel"
      });

      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.data));
      setCurrentUser(res.data.data);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });

      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.data));
      setCurrentUser(res.data.data);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  // Google Sign-in (placeholder – implement later)
  const googleSignIn = async () => {
    return { success: false, error: 'Google Sign-In not implemented yet' };
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/auth');
  };

  const value = { currentUser, signup, login, logout, googleSignIn, loading, setLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
