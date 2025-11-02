
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
function App() {
  
 

  return (
    
    <Router>
      <div>
        <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
      </div>
      
    </Router>
   
    
   
  )
}

export default App
