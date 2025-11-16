
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import HostelRooms from './pages/Room/HostelRoom'
import RoomDetails from './pages/Room/RoomDetail'
import SearchResults from './pages/SearchResults/SearchResult'
import Header from './components/header/header'
import Footer from './components/Footer/footer'


function App() {
  const location = useLocation()
    const pageNoHeader = location.pathname.includes("/login")


  return (
    
      <div>
        {!pageNoHeader && <Header/>}

        <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/rooms" element={<SearchResults />} />
        <Route path='/hostel/:hostelId/rooms' element={<HostelRooms/>}/>
        <Route path="/room/:roomId" element={<RoomDetails />} /> 
        


      </Routes>
      {!pageNoHeader && <Footer/>}
      </div>
      
   
    
   
  )
}

export default App
