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
// src/App.js
// src/App.jsx
import React from 'react';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';
import { AuthProvider } from './Contexts/AuthContext';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </div>
    </AuthProvider>
  );
}

export default App;