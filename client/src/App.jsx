
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import HostelRooms from './pages/Room/HostelRoom'
import RoomDetails from './pages/Room/RoomDetail'
import SearchResults from './pages/SearchResults/SearchResult'


function App() {
  

  return (
    
    <Router>
      <div>
        <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/rooms" element={<SearchResults />} />
        <Route path='/hostel/:hostelId/rooms' element={<HostelRooms/>}/>
        <Route path="/room/:roomId" element={<RoomDetails />} /> 
        


      </Routes>
      </div>
      
    </Router>
   
    
   
  )
}

export default App
