'use strict';

const { 
  LOG_INFO,
  LOG_WARNING,
  LOG_ERROR
} = require('./constants/log.constants');

module.exports = class Log {
  constructor(dev) {
    this.dev = dev;
  }

  /**
   * 
   * @param {boolean} 
   */
  _shouldLog(dev) {
    return this.dev === dev || this.dev;
  }

  log(type, message, dev = false) {
    switch (type) {
      case LOG_INFO:
        this.info(message, dev);
        break;
      case LOG_WARNING:
        this.warning(message, dev);
        break;
      case LOG_ERROR:
        this.error(message, dev);
        break;
    }
  }

  info(message, dev = false) {
    if (this._shouldLog(dev)) 
      console.log(`[INFO] ${message}`);
  }

  warning(message, dev = false) {
    if (this._shouldLog(dev)) 
      console.log(`[WARNING] ${message}`);
  }  

  error(message, dev = false) {
    if (this._shouldLog(dev)) 
      console.log(`[ERROR] ${message}`);
  }

};