import jwt from 'jsonwebtoken';

const SECRET_KEY = 'sua-chave-secreta-super-segura';

const tokenBlacklist: Set<string> = new Set();

export function generateToken(username: string): string {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
}

export function addToBlacklist(token: string): void {
  tokenBlacklist.add(token);
}

export function isTokenBlacklisted(token: string): boolean {
  return tokenBlacklist.has(token);
}

export function verifyToken(token: string): string | jwt.JwtPayload {
  return jwt.verify(token, SECRET_KEY);
}