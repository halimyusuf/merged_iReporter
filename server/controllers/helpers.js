const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const config = require('config');

const Helper = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(id, user) {
    const token = jwt.sign({
      userId: id,
      username: user,
    },
    config.get('jwtPrivateKey'), { expiresIn: '7d' });
    return token;
  },
};

module.exports = Helper;
require('make-runnable');
