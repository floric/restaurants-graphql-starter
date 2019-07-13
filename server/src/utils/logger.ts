import Pino, { Logger } from "pino";

export const logger: Logger = Pino({
  prettyPrint: {
    colorize: true,
    translateTime: true,
    ignore: "hostname,pid"
  }
});

export const logError = (err: Error | null) => {
  if (!err) {
    logger.error("Unknown error happened");
  } else {
    logger.error(`${err.name}: ${err.message}`, err.stack);
  }
};
