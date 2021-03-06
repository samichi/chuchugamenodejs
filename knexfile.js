// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://postgres:postgres@localhost/db_paseo'
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};
