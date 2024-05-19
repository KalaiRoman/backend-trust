
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import ConnectDB from './middleware/DataBaseConnect.js';
dotenv.config();
// Db Connect
ConnectDB();
const app=express();
app.use(express.json());
app.use(cors("*"));
app.use(morgan("dev"));
app.use(helmet());
app.listen(process.env.PORT,()=>{
console.log(`server Running Port ${process.env.PORT}`);
})