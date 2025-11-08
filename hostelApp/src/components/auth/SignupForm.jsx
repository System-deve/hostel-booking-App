// src/components/auth/SignupForm.jsx
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth'; // This import
import googleLogo from '../../assets/stone.jpeg';
import { useNavigate } from 'react-router-dom';

export function SignupForm({ toggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await googleSignIn();
    if (!result.success) {
      alert('Error: ' + result.error);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (!agreeToTerms) {
      alert("Please agree to the Terms and Conditions");
      return;
    }

    setLoading(true);
    const result = await signup(email, password, fullName);
    
    if (!result.success) {
      alert('Error: ' + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <div className="welcome-section">
        <div className="welcome-message">
          Create<br />
          <span>Your Account</span>
        </div>
      </div>
      <form className="form-box" onSubmit={handleSignUp}>
        <h3>Join Us Today</h3>
        
        <div className="input-group">
          <label>Full Name</label>
          <input 
            className="input-field" 
            type="text" 
            placeholder="Enter your full name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
          />
        </div>
        
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
            placeholder="Create a password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="input-group">
          <label>Confirm Password</label>
          <input 
            className="input-field" 
            type="password" 
            placeholder="Confirm your password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="checkbox-group">
          <label className="checkbox-label" style={{cursor: 'pointer'}}>
            <input 
              type="checkbox" 
              className="checkbox-input" 
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              disabled={loading}
            />
            <span className="checkmark"></span>
            I agree to the <a href="#" className="terms-link">Terms and Conditions</a>
          </label>
        </div>
        
        <div>
          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
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
          <label onClick={() => toggleForm('login')} className="clickable">
            Already have an account? <span className="login-link">Log in</span>
          </label>
        </div>
      </form>
    </div>
  );
}