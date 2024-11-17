import { createLogger, format, transports } from 'winston';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const logger = createLogger({
  level: isProd ? 'info' : 'debug',
  format: format.combine(
    isDev ? format.colorize({ all: true }) : format.uncolorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`),
  ),
  transports: [new transports.Console()],
});

export default logger;
