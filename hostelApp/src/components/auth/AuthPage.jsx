import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import '../../styles/Login-Signup.css';

export function AuthPage() {
  const [currentForm, setCurrentForm] = useState('login');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/dashboard');
  }, [currentUser, navigate]);

  const toggleForm = (form) => setCurrentForm(form);

  return (
    <div className="auth-container">
      {currentForm === 'login' ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <SignupForm toggleForm={toggleForm} />
      )}
    </div>
  );
}
