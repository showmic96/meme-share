const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = {
  verifyJwt: async (req, res, done) => {
    const token = req.cookies.token;
    try {
      const decode = await jwt.verify(token, config.jwt.secret);
      req.user = decode;
    } catch (error) {
      res.status(403)
        .send({ message: 'Access Deniied' });
    }

    return done();
  }
};

module.exports = authMiddleware;
