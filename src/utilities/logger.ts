import * as fs from 'fs/promises';
import * as path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const APP_LOG_FILE = path.join(DATA_DIR, 'app.log');

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  meta?: any;
}

class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private async writeLog(
    level: LogLevel,
    message: string,
    meta?: any
  ): Promise<void> {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      meta,
    };
    const logData = JSON.stringify(logEntry) + '\n';
    try {
      await fs.appendFile(APP_LOG_FILE, logData, 'utf8');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }

    // Also log to console in development
    if (process.env.NODE_ENV !== 'production') {
      const emoji = this.getEmoji(level);
      console.log(`${emoji} [${level}] ${message}`, meta ? meta : '');
    }
  }
  private getEmoji(level: LogLevel): string {
    switch (level) {
      case LogLevel.INFO:
        return 'ℹ️';
      case LogLevel.WARN:
        return '⚠️';
      case LogLevel.ERROR:
        return '❌';
      case LogLevel.DEBUG:
        return '🔍';
      default:
        return '📝';
    }
  }

  public info(message: string, meta?: any): Promise<void> {
    return this.writeLog(LogLevel.INFO, message, meta);
  }
  public warn(message: string, meta?: any): Promise<void> {
    return this.writeLog(LogLevel.WARN, message, meta);
  }
  public error(message: string, meta?: any): Promise<void> {
    return this.writeLog(LogLevel.ERROR, message, meta);
  }
  public debug(message: string, meta?: any): Promise<void> {
    return this.writeLog(LogLevel.DEBUG, message, meta);
  }
}

export default Logger.getInstance();
