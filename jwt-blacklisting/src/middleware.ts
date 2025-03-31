import { Request, Response, NextFunction } from 'express';
import { verifyToken, isTokenBlacklisted } from './authService';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido.' });
  }

  if (token && isTokenBlacklisted(token)) {
    res.status(401).json({ message: 'Token inválido (blacklisted).' });
  }

  try {
    if (typeof token === 'string') {
      const decoded = verifyToken(token);
      req.body.user = decoded; 
      next();
    } else {
      res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
}