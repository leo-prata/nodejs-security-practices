import express, { Request, Response } from 'express';
import { z } from 'zod';

// Define the schema using Zod
const userSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  age: z.number().min(18, 'Age must be at least 18'),
});

// Automatically infer the type from the schema
type User = z.infer<typeof userSchema>;

const app = express();
app.use(express.json());

// Route with schema validation
app.post('/user', (req: Request, res: Response) => {
  try {
    // Validate the request body against the schema
    const userData: User = userSchema.parse(req.body);
    res.status(201).json({ message: 'User is valid!', data: userData });
  } catch (error) {
    if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid data', errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error', error });
  }
});

app.listen(3111, () => {
  console.log('Server running on port 3000');
});