import express from 'express';
import dotenv from 'dotenv';
import blockchainRoutes from './routes/blockchain-routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/blocks', blockchainRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Sandinos Barn Blockchain API is running!',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Sandinos Barn Blockchain API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`⛓️  Blockchain API: http://localhost:${PORT}/api/blocks`);
});

export default app;
