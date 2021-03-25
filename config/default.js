module.exports = {
  app: {
    port: 3030
  },
  db: {
    host: '127.0.0.1',
    dialect: 'mysql',
    database: 'meme',
    username: 'showmic96',
    password: 'showmic96',
  },
  bcrypt: {
    salt: 10,
  },
  jwt: {
    secret: 'secret-key',
    expiresIn: 1 * 60 * 60,
  }
}
