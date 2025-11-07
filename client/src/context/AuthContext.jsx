import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'http://localhost:5001/api/auth';

    // Register
    const register = useCallback(async (firstName, lastName, email, password, confirmPassword) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password, confirmPassword })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            localStorage.setItem('token', data.token);
            setToken(data.token);
            setUser(data.user);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Login
    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token', data.token);
            setToken(data.token);
            setUser(data.user);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get current user
    const getCurrentUser = useCallback(async () => {
        if (!token) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch user');
            }

            setUser(data.user);
            return data.user;
        } catch (err) {
            setError(err.message);
            logout();
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Update profile
    const updateProfile = useCallback(async (updates) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Update failed');
            }

            setUser(data.user);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Logout
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setError(null);
    }, []);

    const value = {
        user,
        token,
        loading,
        error,
        isAuthenticated: !!token,
        register,
        login,
        getCurrentUser,
        updateProfile,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};