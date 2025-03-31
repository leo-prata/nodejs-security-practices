import express, { Request, Response } from 'express';
import helmet from 'helmet';

const app = express();

// Apply Helmet middleware with default settings
app.use(helmet());

// Basic route for testing
app.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'Hello, secure world!' });
});

// Start the server
app.listen(3111, () => {
  console.log('Server running on port 3000');
});