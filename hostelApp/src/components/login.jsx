

        import './Login-Signup.css';
        import { auth } from '../utils/firebase';
        import { signInWithEmailAndPassword } from 'firebase/auth';
        import { useState } from 'react';

        export function LoginForm({ toggleForm }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user);
            alert('Login successful!');
        } catch (error) {
            console.error('Error logging in:', error.message);
            alert('Error: ' + error.message);
        }
    };
  
    return (
        <div className="form-container">
            <div className="welcome-section">
                <div className="welcome-message">
                    Welcome<br />
                    <span>back User</span>
                </div>
            </div>
            <form className="form-box" onSubmit={handleLogin}>
                <h3>Login to your account</h3>
                
                <div className="input-group">
                    <label>Email Address</label>
                    <input 
                        className="input-field" 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
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
                    />
                </div>
                {/* REMOVE onClick from button */}
                <div>
                    <button type="submit" className="login-btn">Log In</button>
                </div>
                
                <div className="signup-prompt">
                    <label onClick={() => toggleForm('signup')} className="clickable">
                        Don't have an account? Sign up
                    </label>
                </div>
            </form>
        </div>
    );
}

       