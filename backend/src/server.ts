import cors from 'cors';
import express, { Express } from 'express';
import appRouter from '@/app/routes';
import logger from '@/logger';
import { getDB } from '@/db';
import { RequestContext } from '@mikro-orm/core';
import errorHandler from '@/middlewares/errorHandler';
import requestLogger from '@/middlewares/requestLogger';

const app = express();

async function initializeServer(app: Express) {
  app.use(cors());
  app.use(express.json());

  logger.info('Initializing database');
  const db = await getDB();
  if (process.env.NODE_ENV === 'production') {
    logger.info('Running migrations');
    const migrator = db.orm.getMigrator();
    await migrator.up(); // Runs pending migrations
  }

  app.use((_req, _res, next) => {
    RequestContext.create(db.em, next);
  });


  app.use(requestLogger);

  app.use('/api', appRouter);

  app.use(errorHandler);

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    logger.info(`App listening on port: ${port}`);
  });
}

initializeServer(app).catch((error) => {
  logger.error('Server initialization failed');
  throw error;
});
