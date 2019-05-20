const pkg = require('../../package.json');
const ENVIRONMENT = process.env.ENVIRONMENT;
const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_DATABASE = process.env.DB_DATABASE;

const hostname = process.env.HOSTNAME || require('os').hostname();

const health = {
  status: 200,
  hostname,
  application: pkg.name,
  version: pkg.version,
  environment: ENVIRONMENT,
  error: null
};

const setHealth = (err, status) => {
  health.error = {
    name: err.name,
    message: err.message,
    stack: err.stack
  };

  health.status = status;
};

const healthCheck = () => {
  return health;
};

const getDbConfig = () => {
  return {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE
  };
};

const config = {
  getPort: () => PORT,
  getHostname: () => hostname,
  getEnvironment: () => ENVIRONMENT,
  getVersion: () => pkg.version,
  getApplication: () => pkg.name,
  getDbHost: () => DB_HOST,
  getDbUser: () => DB_USER,
  getDbPass: () => DB_PASS,
  getDbPort: () => DB_PORT,
  getDb: () => DB_DATABASE,
  getDbConfig,
  healthCheck,
  setHealth
};

const errors = [];

/* istanbul ignore next */
for (const f in config) {
  // setHealth is a helper function, not a config var
  if (f === 'setHealth') {
    continue;
  }
  if (config.hasOwnProperty(f) && typeof config[f] === 'function') {
    const v = config[f]();
    if (v === null || v === undefined) {
      errors.push(
        new Error(
          `The underlying variable in the config function '${f}' is not set correctly`
        )
      );
    }
  }
}

/* istanbul ignore next */
if (errors.length) {
  throw errors.join('\n');
}

module.exports = config;
