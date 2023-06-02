import { pino } from 'pino';
import 'reflect-metadata';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});
