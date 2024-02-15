import { Console } from "console";
import winston, { level } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { allColors } from "winston/lib/winston/config";

const { combine, timestamp, printf, colorize, align, cli } = winston.format;
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});
const infoTransport: DailyRotateFile = new DailyRotateFile({
  filename: "./logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "info",
  maxSize: "1m",
});

const errorTransport: DailyRotateFile = new DailyRotateFile({
  filename: "./logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxSize: "1m",
});

const consoleTransport = new winston.transports.Console({
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printf((info) => `[${info.timestamp}] ${info.level}:${info.message}`)
  ),
});
export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [infoTransport, errorTransport, consoleTransport],
});
