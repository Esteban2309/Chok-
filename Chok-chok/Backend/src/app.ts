import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler } from './middlewares/errorHandlers';
import { logger } from './middlewares/logger';
import analysisRoutes from './routes/analysisRoutes';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(logger);

// Rutas API
app.use('/api/analysis', analysisRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'Chok-chok Backend API' });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
