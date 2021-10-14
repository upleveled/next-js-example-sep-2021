const setPostgresDefaultsOnHeroku = require('./util/setPostgresDefaultsOnHeroku.js');

setPostgresDefaultsOnHeroku();

const options = {};

if (process.env.NODE_ENV === 'production') {
  options.ssl = { rejectUnauthorized: false };
}

module.exports = options;
