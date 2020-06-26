const NotFoundError = require('../errors/NotFoundError');

module.exports.notValidUrl = (req, res, next) => {
  try {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  } catch (err) {
    return next(err);
  }
};
