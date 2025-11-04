// src/components/auth/AuthPage.jsx
import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import '../../styles/Login-Signup.css';

export function AuthPage() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (form) => {
    setCurrentForm(form);
  };

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