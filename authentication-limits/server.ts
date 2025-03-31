import express, { Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const app = express();
app.use(express.json());

// Configure the rate limiter: 5 attempts allowed per minute
const rateLimiter = new RateLimiterMemory({
  points: 5, // Max number of attempts
  duration: 60, // Time window in seconds (1 minute)
});

// Simulated user database (for demo purposes)
const users = [{ username: 'admin', password: 'secret' }];

// Login route with authentication limits
app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const clientIp = req.ip || 'unknown'; // Use IP as the key for rate limiting, fallback to 'unknown'

  try {
    // Check rate limit based on IP
    await rateLimiter.consume(clientIp);

    // Simulate authentication
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      // Reset rate limit on successful login (optional)
      await rateLimiter.delete(clientIp);
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    // Rate limit exceeded
    res.status(429).json({
      message: 'Too many login attempts. Try again in a minute.',
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});