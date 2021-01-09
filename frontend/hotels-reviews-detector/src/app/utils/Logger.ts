//TODO ADD COLLECTION TO SAVE ALL LOGS
export class Logger {
  static log(message) {
    console.log(`log -> ${message}`);
  }
  static info(message) {
    console.info(`info -> ${message}`);
  }
  static error(message) {
    console.error(`error -> ${message}`);
  }
  static warn(message) {
    console.warn(`warn -> ${message}`);
  }
}
