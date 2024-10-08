import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();
const app=express();
app.use(express.json());
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});