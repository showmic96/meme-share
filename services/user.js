const bcrypt = require('bcrypt');
const config = require('config');
const _ = require('lodash');

const { user } = require('../loaders/db');

const userService = {
  createUser: async ({ fullName, username, password }) => {
    const passwordHash = await bcrypt.hash(password, config.bcrypt.salt);

    const userCreateData = {
      fullName,
      username,
      password: passwordHash
    };

    return user.create(userCreateData)
      .then((createdUser) => {
        return _.omit(createdUser.get({ plain: true }), 'password');
      });
  },

  login: async ({ username, password }) => {
    return user.findOne({ where: { username } })
      .then(async (userData) => {
        if (!userData) {
          const error = {
            status: 404,
            message: 'User not found'
          };

          return Promise.reject(error);
        }

        const userDetails = userData.get({ plain: true });

        const match = await bcrypt.compare(password, userDetails.password);

        if (!match) {
          const error = {
            status: 400,
            message: 'Invalid username or password'
          };

          return Promise.reject(error);
        }

        return userDetails;
      });
  }
};

module.exports = userService;