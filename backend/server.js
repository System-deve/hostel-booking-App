import cors from 'cors';
import ConnectDB from "./src/Config/database.js";
import express from 'express';
import Hostel from './src/Routes/Hostel.js'
import Room from './src/Routes/Room.js'

const PORT = process.env.PORT || 5001;
const app = express()
app.use(cors())
app.use(express.json());

// this is where render i will start 
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Hostel Booking API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      hostels: '/api/hostels',
      rooms: '/api/rooms',
      allHostels: '/api/hostels/allHostels',
      locationBased: '/api/hostels/locationBasedHostels'
    },
    documentation: 'Check the README for API documentation'
  });
});

//  health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Hostel Booking API'
  });
});

app.use('/api/rooms', Room);
app.use('/api/hostels', Hostel);

app.listen(PORT, async()=>{
    console.log(`server connected at: http://localhost:${PORT}`);
    await ConnectDB();
});