import express, { Request, Response } from 'express';
import cors from "cors";
import { clerkMiddleware, getAuth } from '@clerk/express'
import { shouldBeUser } from './middleware/authMiddleware.js';

const app = express();

app.use(clerkMiddleware());

app.use(cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true
}))

app.get('/health', (req: Request, res: Response) => {
    return res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    })
})

app.get('/test', shouldBeUser, (req: Request, res: Response) => {
    res.json({ 
        message: "Product service authenticated",
        userId: req.userId
    });
})

app.listen(8000, () => {
    console.log("Product Service is running on 8000")
})