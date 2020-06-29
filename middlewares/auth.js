const jwt = require('jsonwebtoken');
const AutorizationError = require('../errors/AutorizationError');
const { JWT_KEYS } = require('../config');
const { needAuth } = require('../static/constants');

module.exports.auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new AutorizationError(needAuth);
  }

  let payload;

  try {
    payload = jwt.verify(
      req.cookies.jwt,
      JWT_KEYS,
    );
  } catch (err) {
    return next(new AutorizationError(needAuth));
  }

  req.user = payload;

  return next();
};
