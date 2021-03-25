const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('config');

const userService = require('../services/user');

router.post('/create-user', (req, res) => {
  const userCreateData = req.body;

  return userService.createUser(userCreateData)
    .then((createdUser) => {
      res.status(200)
        .send(createdUser);
    })
    .catch((error) => {
      res.status(error.status || 500)
        .send(error);
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  return userService.login({ username, password })
    .then((loginResponse) => {
      const jwtConfig = config.jwt;

      const token = jwt.sign({ username, password }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn
      });

      res.cookie('token', token, {
        maxAge: jwtConfig.expiresIn * 1000,
        httpOnly: true
      });

      res.send(200)
        .status({ message: 'Login Successful' });
    })
    .catch((error) => {
      res.status(error.status || 500)
        .send(error);
    });
});

module.exports = router;