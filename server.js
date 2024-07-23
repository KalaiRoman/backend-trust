
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import ConnectDB from './middleware/DataBaseConnect.js';
import routing from './routings/Routing.js';
dotenv.config();
// Db Connect
ConnectDB();
const app=express();
app.use(express.json());
app.use(morgan(`${process.env.MARGAN_PLATFORM}`));
app.use(helmet());
app.use(cors({ credentials: process.env.CREDENTIALS,origin: ['http://localhost:3000',"http://localhost:3001"]}));
// apis
app.get("/",(req,res)=>{
    res.send("Trust Backend Working Fine bro Cool 😁");
})
app.use("/api/trust",routing)
app.listen(process.env.PORT,()=>{
console.log(`server Running http:localhost:${process.env.PORT}`);
})