const NotFoundError = require('../errors/NotFoundError');
const { notFoundSource } = require('../static/constants');

module.exports = (req, res, next) => {
  next(new NotFoundError(notFoundSource));
};
