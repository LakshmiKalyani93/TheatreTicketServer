const log4js = require('log4js');
const path = require('path');
const fs = require('fs');
const config = require('config');

let infoLog = null;
let errorLog = null;
let securityLog = null;
let accessLog = null;


const logDir = process.env.LOG_DIR || path.join(__dirname, '../../../../logs');
const appPackage = require('../../../../package.json');

fs.existsSync(logDir) || fs.mkdirSync(logDir); // eslint-disable-line no-unused-expressions

log4js.addLayout('json', () => (logEvent) => {
  const data = logEvent.data[0] || {};
  data.pid = logEvent.pid;
  data.timestamp = logEvent.startTime;
  data.application = appPackage.name;
  data.host = appPackage.host ? appPackage.host : 'localhost';
  data.version = appPackage.version;
  if (logEvent.categoryName !== 'access') {
    data.level = logEvent.level.levelStr;
    data.context = logEvent.context;
  }
  return JSON.stringify(data);
});

// let app;
const init = (() => {
  // app = server;
  log4js.configure({
    pm2: true,
    disableClustering: true,
    appenders: {
      debugFlie: {
        type: 'file',
        layout: { type: 'json', separator: ',' },
        filename: path.join(logDir, '/debug.log'),
        maxLogSize: 10 * 1024 * 1024, // = 10Mb
        backups: 5, // keep five backup files
        compress: true, // compress the backups
        encoding: 'utf-8',
      },
      file: {
        type: 'file',
        layout: { type: 'json', separator: ',' },
        filename: path.join(logDir, '/info.log'),
        maxLogSize: 10 * 1024 * 1024, // = 10Mb
        backups: 5, // keep five backup files
        compress: true, // compress the backups
        encoding: 'utf-8',
      },
      errorFile: {
        type: 'file',
        layout: { type: 'json', separator: ',' },
        filename: path.join(logDir, '/error.log'),
        maxLogSize: 10 * 1024 * 1024, // = 10Mb
        backups: 5, // keep five backup files
        compress: true, // compress the backups
        encoding: 'utf-8',
      },
      securityLogFile: {
        type: 'file',
        layout: { type: 'json', separator: ',' },
        filename: path.join(logDir, '/security.log'),
        maxLogSize: 10 * 1024 * 1024, // = 10Mb
        backups: 5, // keep five backup files
        compress: true, // compress the backups
        encoding: 'utf-8',
      },
      accessLogFile: {
        type: 'file',
        layout: { type: 'json', separator: ',' },
        filename: path.join(logDir, '/access.log'),
        maxLogSize: 10 * 1024 * 1024, // = 10Mb
        backups: 5, // keep five backup files
        compress: true, // compress the backups
        encoding: 'utf-8',
      }
    },
    categories: {
      default: { appenders: ['debugFlie'], level: config.get('LogLevel') },
      info: { appenders: ['file'], level: config.get('LogLevel') },
      error: { appenders: ['errorFile'], level: config.get('LogLevel') },
      security: { appenders: ['securityLogFile'], level: 'info' },
      access: { appenders: ['accessLogFile'], level: 'info' }
    },
  });
  infoLog = log4js.getLogger('info');
  errorLog = log4js.getLogger('error');
  securityLog = log4js.getLogger('security');
  accessLog = log4js.getLogger('access');
});

const info = ((data) => {
  infoLog.info(data);
});

const error = ((data) => {
  errorLog.error(data);
});

const fatal = ((data) => {
  errorLog.fatal(data);
});

const warn = ((data) => {
  errorLog.warn(data);
});

const security = ((data) => {
  if (data.logLevel && securityLog[data.logLevel]) {
    securityLog[data.logLevel](data);
  }
});

const access = ((data) => {
  accessLog.info(data);
});

const message = (() => ({
  tenantId: '',
  userId: '',
  correlationId: '',
  message: '',
  data: '',
}));
module.exports = {
  init,
  message,
  info,
  error,
  fatal,
  warn,
  security,
  access
};
