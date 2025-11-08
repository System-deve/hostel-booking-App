import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; 

export function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  // if not logged in, redirect to login/signup page
  return currentUser ? children : <Navigate to="/auth" replace />;
}
