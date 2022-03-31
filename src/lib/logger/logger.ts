import pino from 'pino';

const config = {
    env: process.env.NODE_ENV
};

const pinoConfig = {
    browser: {
        asObject: true
    }
};

const logger = pino(pinoConfig);

export const log = (msg: string) => logger.info(msg);
export default logger;
