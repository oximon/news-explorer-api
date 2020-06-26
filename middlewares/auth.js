const jwt = require('jsonwebtoken');
const AutorizationError = require('../errors/AutorizationError');
const { JWT_KEYS } = require('../config');

module.exports.auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new AutorizationError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(
      req.cookies.jwt,
      JWT_KEYS,
    );
  } catch (err) {
    return next(new AutorizationError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
