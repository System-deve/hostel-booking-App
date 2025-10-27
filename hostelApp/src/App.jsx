import React, { useState } from 'react'
import { LoginForm } from './components/login.jsx'
import { SignupForm } from './components/signIn.jsx'
 function App() {
            const [currentForm, setCurrentForm] = useState('login');
            
            const toggleForm = (formName) => {
                setCurrentForm(formName);
            };
            
            return (
                <>
                    {currentForm === 'login' ? (
                        <LoginForm toggleForm={toggleForm} />
                    ) : (
                        <SignupForm toggleForm={toggleForm} />
                    )}
                </>
            );
        }

        export default App;
