const chai = require('chai');
const should = chai.should();

const configObject = require('./testConfig');

describe('config getters', () => {
  const {
    getDbUser,
    getDbHost,
    getDbPass,
    getDbPort,
    getDb,
    getHostname,
    getPort,
    getEnvironment,
    getVersion,
    getApplication,
    healthCheck,
    setHealth,
    getDbConfig
  } = require('../../src/Config/config');

  it('getDbUser should return a string', () => {
    getDbUser().should.be.a.string;
    getDbUser().should.be.equals(configObject.dbUser);
  });

  it('getDbHost should return a string', () => {
    getDbHost().should.be.a.string;
    getDbHost().should.be.equals(configObject.dbHost);
  });

  it('getDbPass should return a string', () => {
    getDbPass().should.be.a.string;
    getDbPass().should.be.equals(configObject.dbPass);
  });

  it('getDb should return a string', () => {
    getDb().should.be.a.string;
    getDb().should.be.equals(configObject.dbName);
  });

  it('getDbPort should return a string', () => {
    getDbPort().should.be.a.string;
    getDbPort().should.be.equals(configObject.dbPort);
  });

  it('getHostname should return a string', () => {
    getHostname().should.be.a.string;
  });

  it('getPort should return a string', () => {
    getPort().should.be.a.string;
  });

  it('getEnvironment should return a string', () => {
    getEnvironment().should.be.a.string;
  });

  it('getVersion should return a string', () => {
    getVersion().should.be.a.string;
  });

  it('getApplication should return a string', () => {
    getApplication().should.be.a.string;
    getApplication().should.be.equals('hotrestaurant-advanced');
  });

  it('getDbConfig should return an object', () => {
    getDbConfig().should.have.keys('host', 'user', 'password', 'database');
    getDbConfig().should.be.deep.equals(configObject.dbConfig);
  });

  it('healthcheck should return a healthy status if no errors', () => {
    const { status, error } = healthCheck();
    should.exist(status);
    should.not.exist(error);
    status.should.be.equal(200);
  });

  it('healthcheck should return an unhealthy status if errors', () => {
    setHealth(Error('Bad things happened!'), 500);
    const { status, error } = healthCheck();
    should.exist(status);
    should.exist(error);
    status.should.be.equal(500);
    error.should.have.property('name');
    error.should.have.property('message');
    error.should.have.property('stack');
    error.message.should.be.equals('Bad things happened!');
    error.name.should.be.equals('Error');
    error.stack.should.be.a.string;
  });
});
