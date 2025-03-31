import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ limit: '100kb', extended: true }));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status === 413) {
    res.status(413).json({ message: 'Payload too large. Maximum size is 100kb.' });
  }
  next(err);
});

app.post('/data', (req: Request, res: Response) => {
  res.json({ message: 'Data received', data: req.body });
});

app.listen(3111, () => {
  console.log('Server running on port 3111');
});