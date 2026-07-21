import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { apiRateLimiter } from './middlewares/rateLimiter';

const app = express();

// Security Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting
app.use('/api', apiRateLimiter);

// Static uploads serving
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Root landing & Health check endpoints
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'FundRaise Pro Backend API',
    status: 'UP',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      campaigns: '/api/campaigns',
      categories: '/api/campaigns/categories',
    },
    timestamp: new Date(),
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'FundRaise Pro Backend Operational', timestamp: new Date() });
});

// API Routes
app.use('/api', routes);

// Global Error Handler
app.use(errorHandler);

export default app;
