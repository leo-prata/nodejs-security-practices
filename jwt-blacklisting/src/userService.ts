import bcrypt from 'bcryptjs';

export interface User {
  username: string;
  password: string;
}

const users: User[] = [];

export async function registerUser(username: string, password: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };
  users.push(user);
  return user;
}

export async function verifyUser(username: string, password: string): Promise<User | null> {
  const user = users.find(u => u.username === username);
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
}