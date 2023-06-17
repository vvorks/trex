import { Strings } from "./Strings";
import { ConsoleLogger } from "./ConsoleLogger";
import { LogLevel } from "./Logger";
import { Metric } from "web-vitals";

/**
 * ログ出力ユーティリティ（Facade）
 */
export class Logs {
  private static readonly LOGGERS = [new ConsoleLogger()];

  private static message(type: string, format: string, args: any[]): string {
    let now = new Date();
    let message = Strings.sprintf(
      "%02d/%02d %02d:%02d:%02d.%03d %s %s",
      //now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds(),
      type,
      Strings.vsprintf(format, args)
      //Logs.getCaller()
    );
    return message;
  }

  public static error(format: string, ...args: any[]): void {
    const msg = Logs.message("E", format, args);
    for (const logger of Logs.LOGGERS) {
      logger.log(LogLevel.ERROR, msg);
    }
  }

  public static warn(format: string, ...args: any[]): void {
    const msg = Logs.message("W", format, args);
    for (const logger of Logs.LOGGERS) {
      logger.log(LogLevel.WARN, msg);
    }
  }

  public static info(format: string, ...args: any[]): void {
    const msg = Logs.message("I", format, args);
    for (const logger of Logs.LOGGERS) {
      logger.log(LogLevel.INFO, msg);
    }
  }

  public static debug(format: string, ...args: any[]): void {
    const msg = Logs.message("D", format, args);
    for (const logger of Logs.LOGGERS) {
      logger.log(LogLevel.DEBUG, msg);
    }
  }

  public static verbose(format: string, ...args: any[]): void {
    const msg = Logs.message("V", format, args);
    for (const logger of Logs.LOGGERS) {
      logger.log(LogLevel.VERBOSE, msg);
    }
  }

  public static vitals(m: Metric): void {
    const msg = Logs.message("P", "%-4s %8.3f", [m.name, m.value]);
    for (const logger of Logs.LOGGERS) {
      logger.log(LogLevel.VERBOSE, msg);
    }
  }

  public static trace(err?: Error): void {
    if (!err) {
      err = new Error();
    }
    const stack = err.stack;
    if (!!stack) {
      const array = stack.split("\n");
      for (const logger of Logs.LOGGERS) {
        for (const e of array) {
          logger.log(LogLevel.VERBOSE, e);
        }
      }
    }
  }
}
