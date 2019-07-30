const { Pool } = require('pg');
// const dotenv = require('dotenv');
const config = require('config');

// dotenv.config();

const pool = new Pool({
  connectionString: "postgres://postgres@127.0.0.1:5432/test",
});
// config.get('dbPrivateKey')

module.exports = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

// DB_URL = postgres://postgres@127.0.0.1:5432/test
// DB_URL=postgres://evgsfxey:O3nPqM7obcrppHBbsdmCFNL7-G11Lotv@pellefant.db.elephantsql.com:5432/evgsfxey
// ,
//     "dbPrivateKey": "iReporter_dbPrivateKey"
//     ,
//     "dbPrivateKey": ""
