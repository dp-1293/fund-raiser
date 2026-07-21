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

import fs from 'fs';

// Static uploads serving
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Check for built frontend UI in process.cwd()/frontend/dist
const frontendDistPath = path.join(process.cwd(), 'frontend/dist');
const hasFrontend = fs.existsSync(path.join(frontendDistPath, 'index.html'));

if (hasFrontend) {
  app.use(express.static(frontendDistPath));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'FundRaise Pro Backend Operational', timestamp: new Date() });
});

// API Routes
app.use('/api', routes);

// Serve Frontend SPA for non-API routes if built frontend is present
if (hasFrontend) {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
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
}

// Global Error Handler
app.use(errorHandler);

export default app;
