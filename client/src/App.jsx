import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage/HomePage'
import HostelRooms from './pages/Room/HostelRoom'
import RoomDetails from './pages/Room/RoomDetail'
import SearchResults from './pages/SearchResults/SearchResult'
import Header from './components/header/header'
import Footer from './components/Footer/footer'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

function App() {
    const location = useLocation()
    const pageNoHeader = location.pathname.includes("/login") || location.pathname.includes("/register")

    return (
        <AuthProvider>
            <div>
                {!pageNoHeader && <Header />}
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path="/rooms" element={<SearchResults />} />
                    <Route path='/hostel/:hostelId/rooms' element={<HostelRooms />} />
                    <Route path="/room/:roomId" element={<RoomDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                {!pageNoHeader && <Footer />}
            </div>
        </AuthProvider>
    )
}

export default App