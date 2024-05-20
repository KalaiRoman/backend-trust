
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
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ credentials: true}));

// apis
app.use("/api/trust",routing)
app.listen(process.env.PORT,()=>{
console.log(`server Running Port ${process.env.PORT}`);
})