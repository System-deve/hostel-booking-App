// src/components/auth/LoginForm.jsx
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth'; // This import
import googleLogo from '../../assets/stone.jpeg';

export function LoginForm({ toggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleSignIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);
    if (!result.success) {
      alert('Error: ' + result.error);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await googleSignIn();
    if (!result.success) {
      alert('Error: ' + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <div className="welcome-section">
        <div className="welcome-message">
          Welcome<br />
          <span>Back!</span>
        </div>
      </div>
      <form className="form-box" onSubmit={handleLogin}>
        <h3>Sign In to Your Account</h3>
        
        <div className="input-group">
          <label>Email Address</label>
          <input 
            className="input-field" 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="input-group">
          <label>Password</label>
          <input 
            className="input-field" 
            type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
        
        <div>
          <button 
            type="button" 
            className="google-signin-btn" 
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <img src={googleLogo} className='google-logo' alt="Google logo" />
            {loading ? 'Signing In...' : 'Sign in with Google'}
          </button>
        </div>

        <div className="login-prompt">
          <label onClick={() => toggleForm('signup')} className="clickable">
            Don't have an account? <span className="login-link">Sign Up</span>
          </label>
        </div>
      </form>
    </div>
  );
}