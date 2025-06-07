import express from 'express';
import dotenv from 'dotenv';
import blockchainRoutes from './routes/blockchain-routes';
import donationRoutes from './routes/donation-routes';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use('/api/blocks', blockchainRoutes);
app.use('/api/donations', donationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Sandinos Barn Blockchain API is running!',
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res, next) => {
  const error = new Error(`Cannot find ${req.originalUrl} on this server`);
  (error as any).statusCode = 404;
  next(error);
});

// Error handling middleware
app.use(errorHandler);

export default app;
