
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const db = require('../database/database');

const auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-auth-token'];
    if (!token) {
      return res.status(400).send({ message: 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, config.get('jwtPrivateKey'));
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(403).send({ message: 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId, user: decoded.username };
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

function validateUser(user) {
  const schema = {
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    othernames: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    phonenumber: Joi.string().min(10).required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,50})$/).required(),
    // status : Joi.string().valid(["draft", "under investigation", "resolved","rejected" ])
    // isAdmin: Joi.boolean().invalid(false).required(),
  };

  return Joi.validate(user, schema);
}


function validateLogin(login) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,50})$/).required(),
  };
  return Joi.validate(login, schema);
}


function validateRedflag(redflag) {
  const schema = {
    title: Joi.string().min(10).required(),
    story: Joi.string().min(30).required(),
    // status : Joi.string().valid(["draft", "under investigation", "resolved","rejected" ]),
    type: Joi.string().valid(['Redflag', 'Intervention']),
    longitude: Joi.string().min(1).required(),
    latitude: Joi.string().min(1).required(),
    images: Joi.string(),
    videos: Joi.string(),
  };

  return Joi.validate(redflag, schema);
}

function validateComment(comment) {
  const schema = {
    story: Joi.string().min(30).required(),
  };

  return Joi.validate(comment, schema);
}

function validateStatus(status) {
  const schema = {
    status: Joi.string().valid(['Draft', 'Under investigation', 'Resolved', 'Rejected']),
  };
  return Joi.validate(status, schema);
}

function validateLocation(location) {
  const schema = {
    longitude: Joi.string().min(1).required(),
    latitude: Joi.string().min(1).required(),
  };

  return Joi.validate(location, schema);
}

exports.validate_user = validateUser;
exports.validate_redflag = validateRedflag;
exports.validate_comment = validateComment;
exports.validate_location = validateLocation;
exports.validate_login = validateLogin;
exports.validate_status = validateStatus;
exports.auth = auth;
