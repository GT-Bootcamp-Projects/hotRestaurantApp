const mysql = require('mysql');
const { getDbConfig } = require('../../Config/config');

module.exports = {
  connection: () => {
    const dbConfig = getDbConfig();
    return mysql.createConnection(dbConfig);
  }
}

