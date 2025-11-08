import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './components/auth/AuthPage';
import Dashboard from './components/dashboard/Dashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
