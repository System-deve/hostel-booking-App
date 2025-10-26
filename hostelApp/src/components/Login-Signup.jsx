

        import './Login-Signup.css';
        import { auth,googleProvider } from '../utils/firebase';
        import { createUserWithEmailAndPassword,signInWithPopup } from 'firebase/auth';
        import { signInWithEmailAndPassword } from 'firebase/auth';
        import googleLogo from '../assets/stone.jpeg';
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

        export function SignupForm({ toggleForm }) {
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [confirmPassword, setConfirmPassword] = useState('');
            const [fullName, setFullName] = useState('');
            const [agreeToTerms, setAgreeToTerms] = useState(false);

            const handleGoogleSignIn = async () => {

                try {
                    const result = await signInWithPopup(auth, googleProvider);
                    console.log('User signed in with Google:', result.user);
                } catch (error) {
                    console.error('Error signing in with Google:', error.message);
                }
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

                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    console.log('User created:', userCredential.user);
                    alert('Account created successfully!');
                    
                    // You can update the user profile with the full name
                    await userCredential.user.updateProfile({
                        displayName: fullName
                    });
                    
                } catch (error) {
                    console.error('Error signing up:', error.message);
                    alert('Error: ' + error.message);
                }
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
                            />
                        </div>
                        
                        <div className="checkbox-group">
                            <label className="checkbox-label" style={{cursor: 'pointer'}}>
                                <input 
                                    type="checkbox" 
                                    className="checkbox-input" 
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                />
                                <span className="checkmark"></span>
                                I agree to the <a href="#" className="terms-link">Terms and Conditions</a>
                            </label>
                        </div>
                        <div>
                            <button type="submit" className="signup-btn" >Sign Up</button>
                        </div>
                        <div ><button type="button" className="google-signin-btn" onClick={handleGoogleSignIn}><img src={googleLogo} className='google-logo' alt="Google logo" />Sign in with Google</button></div>

                        <div className="login-prompt">
                            <label onClick={() => toggleForm('login')} className="clickable">
                                Already have an account? <span className="login-link">Log in</span>
                            </label>
                        </div>
                    </form>
                </div>
            );
        }


