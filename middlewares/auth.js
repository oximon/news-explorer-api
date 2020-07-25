const jwt = require('jsonwebtoken');
const AutorizationError = require('../errors/AutorizationError');
const { JWT_KEYS } = require('../config');
const { needAuth } = require('../static/constants');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AutorizationError(needAuth);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(
      token,
      JWT_KEYS,
    );
  } catch (err) {
    return next(new AutorizationError(needAuth));
  }

  req.user = payload;

  return next();
};
