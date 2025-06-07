import app from './app';
import { initializeBlockchain } from './controllers/blockchain-controller';
import { initializeDataDirectory } from './utilities/fileUtils';
import logger from './utilities/logger';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initializeDataDirectory();
    await initializeBlockchain();

    logger.info('Server starting', { port: PORT });

    app.listen(PORT, () => {
      logger.info('Sandinos Barn Blockchain API started successfully', {
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
      });

      console.log(`🚀 Sandinos Barn Blockchain API running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`⛓️  Blockchain API: http://localhost:${PORT}/api/blocks`);
      console.log(`💝 Donations API: http://localhost:${PORT}/api/donations`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
