{/*import React, { useState } from 'react'
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

        export default App;*/}

// src/App.js
import React from 'react';
import Dashboard from './components/dashboard/Dashboard';
import './styles/dashboard.css';

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;