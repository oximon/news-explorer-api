/* eslint-disable no-restricted-syntax */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AutorizationError = require('../errors/AutorizationError');
const { JWT_KEYS } = require('../config');
const { incorrectLoginOrPaswword } = require('../static/constants');

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

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
      name,
      email,
      password: hash,
    });
    return res.send({
      data: {
        name: user.name,
        email: user.email,
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
      JWT_KEYS,
      { expiresIn: '7d' },
    );
    console.log(JWT_KEYS);
    return res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
      .json({ token });
  } catch (err) {
    return next(new AutorizationError(incorrectLoginOrPaswword));
  }
};
