import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json()); 

const users: { username: string; password: string }[] = [];

app.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username e senha são obrigatórios.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  return res.status(201).json({ message: 'Usuário registrado!' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});