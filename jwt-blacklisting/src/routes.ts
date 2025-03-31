import express, { Request, Response, Router } from 'express';
import { registerUser, verifyUser } from './userService';
import { generateToken, addToBlacklist } from './authService';
import { authMiddleware } from './middleware';

const router: Router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ message: 'Username e senha são obrigatórios.' });
  }

  try {
    const user = await registerUser(username, password);
        res.status(201).json({ message: 'Usuário registrado!', username: user.username });
  } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar.', error });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Username e senha são obrigatórios.' });
  }

  const user = await verifyUser(username, password);
  if (!user) {
    res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const token = generateToken(username);
    res.status(200).json({ message: 'Login bem-sucedido!', token });
});

router.post('/logout', authMiddleware, (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    addToBlacklist(token);
  }
  res.status(200).json({ message: 'Logout realizado com sucesso!' });
});

router.get('/protected', authMiddleware, (req: Request, res: Response) => {
  res.status(200).json({ message: 'Acesso permitido!', user: req.body.user });
});

export default router;