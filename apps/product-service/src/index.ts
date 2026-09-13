import express, { Request, Response } from 'express';
import cors from "cors";
import { clerkMiddleware, getAuth } from '@clerk/express'

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

app.get('/test', (req: Request, res: Response) => {
    const auth = getAuth(req);
    const userId = auth.userId;

    if (!userId) {
        return res.status(401).json({ message: "You are not logged in!" })
    }

    res.json({ message: "Product service authenticated" });
})

app.listen(8000, () => {
    console.log("Product Service is running on 8000")
})