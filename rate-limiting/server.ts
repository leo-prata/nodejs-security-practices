import express, { Request, Response } from 'express';
import { limiter } from './limiting';

const app = express();
const port = 3111;

app.use(limiter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});