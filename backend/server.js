import cors from 'cors';
import ConnectDB from "./src/Config/database.js";
import express from 'express';
import Hostel from './src/Routes/Hostel.js'
import Room from './src/Routes/Room.js'
import Auth from './src/Routes/Auth.js'
import { errorHandler } from './src/utils/errorHandler.js';

const PORT = process.env.PORT;
const app = express()

app.use(cors())
app.use(express.json());

// Routes
app.use('/api/auth', Auth);
app.use('/api/rooms', Room);
app.use('/api/hostels', Hostel)

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`server connected at: http://localhost:${PORT}`);
    await ConnectDB();
})