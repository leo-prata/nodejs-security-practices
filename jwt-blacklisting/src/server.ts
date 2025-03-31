import express, { Application } from 'express';
import routes from './routes';

const app: Application = express();
app.use(express.json());
app.use('/api', routes);

const PORT = 3111;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});