module.exports.centerErrors = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: err.message });
  }
  if (err.code === 11000) {
    return res
      .status(409)
      .send({ message: 'Пользователь с такой почтой уже существует' });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'ID не найден' });
  }
  if (!err.statusCode) {
    const { statusCode = 500, message } = err;
    return res
      .status(statusCode)
      .send({
        message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
      });
  }
  res.status(err.statusCode).send({ message: err.message });
  return next();
};
