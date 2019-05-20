const pkg = require('../../package.json');
const jwks = require('jwks-rsa');
const ENVIRONMENT = process.env.ENVIRONMENT;
const PORT = process.env.PORT || 8080;
const AUTH_URI = process.env.AUTH_URI;
const AUTH_AUDIENCE = process.env.AUTH_AUDIENCE;
const AUTH_ISSUER = process.env.AUTH_ISSUER;
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
}

const setHealth = (err, status) => {
  health.error = {
    name: err.name,
    message: err.message,
    stack: err.stack
  }

  health.status = status;
}

const healthCheck = () => {
  return health;
}

const jwtValidator = () => {
  return {
    secret: jwks.expressJwtSecret({
      cache: 5,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: AUTH_URI
    }),
    audience: AUTH_AUDIENCE,
    issuer: AUTH_ISSUER,
    algorithms: ['RS256']
  }
};

const getDbConfig = () => {
  return {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE
  }
};

const config = {
  port: () => PORT,
  getDbHost: () => DB_HOST,
  getDbUser: () => DB_USER,
  getDbPass: () => DB_PASS,
  getDbPort: () => DB_PORT,
  getDb: () => DB_DATABASE,
  getDbConfig,
  jwtValidator
}

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
