const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { login, createUser, logout } = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(2),
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(2),
    email: Joi.string().required().email(),
  }),
}), login);

router.post('/logout', logout);

module.exports = router;
