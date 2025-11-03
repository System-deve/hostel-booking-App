import cors from 'cors';
import ConnectDB from "./src/Config/database.js";
import express from 'express';
import Hostel from './src/Routes/Hostel.js'
import Room from './src/Routes/Room.js'


const PORT = process.env.PORT;
const app = express()
app.use(cors())
app.use(express.json());

app.use('/api/hostels', Hostel)
app.use('/api/rooms', Room);

app.listen(PORT, async()=>{
    console.log(`server connected at: http://localhost:${PORT}`);
    await ConnectDB();
})
