const setPostgresDefaultsOnHeroku = require('./util/node-heroku-postgres-env-vars.js');

setPostgresDefaultsOnHeroku();

const options = {};

if (process.env.NODE_ENV === 'production') {
  options.ssl = { rejectUnauthorized: false };
}

module.exports = options;
