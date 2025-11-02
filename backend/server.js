import cors from 'cors';
import ConnectDB from "./src/Config/database.js";
import express from 'express';


const PORT = process.env.PORT;
const app = express()
app.use(cors())
app.use(express.json());
app.listen(PORT, async()=>{
    console.log(`server connected at: http://localhost:${PORT}`);
    await ConnectDB();
})
