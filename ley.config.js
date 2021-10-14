import setPostgresDefaultsOnHeroku from './util/node-heroku-postgres-env-vars';

setPostgresDefaultsOnHeroku();

const options = {};

if (process.env.NODE_ENV === 'production') {
  options.ssl = { rejectUnauthorized: false };
}

module.exports = options;
