const jwt = require('jsonwebtoken');
const AutorizationError = require('../errors/AutorizationError');

module.exports.auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new AutorizationError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(
      req.cookies.jwt,
      process.env.NODE_ENV === 'production'
        ? process.env.JWT_SECRET
        : 'dev-secret',
    );
  } catch (err) {
    return next(new AutorizationError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
