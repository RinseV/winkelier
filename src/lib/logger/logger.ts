import pino from 'pino';

const pinoConfig = {
    browser: {
        asObject: true
    }
};

const logger = pino(pinoConfig);

export const log = (msg: string) => logger.info(msg);
export default logger;
