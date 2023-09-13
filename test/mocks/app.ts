import express, { Request, Response } from 'express';
import { detectMiddleware } from '../../src/middlewares/detectMiddleware';

const app = express();

app.use(express.json());

app.post('/upload', detectMiddleware, (req: Request, res: Response) => {
    console.log('Uploaded');
    res.status(200).json({ ok: true });
});

export default app;
