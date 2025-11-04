// src/components/auth/ProtectedRoute.jsx
import { useAuth } from '../../hooks/useAuth'; 
import { AuthPage } from './AuthPage';

export function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <AuthPage />;
}