const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AutorizationError = require('../errors/AutorizationError');

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find({});
    return res.send({ data: user });
  } catch (err) {
    return next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const { password, name, email } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hash,
    });
    return res.send({
      data: {
        name: user.name, email: user.email,
      },
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    return res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    }).json({ token });
  } catch (err) {
    return next(new AutorizationError('Неправильные логин или пароль'));
  }
};
