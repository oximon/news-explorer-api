const router = require('express').Router();
const userRouter = require('./users');
const articlesRouter = require('./articles');
const authRouter = require('./auth');
const notValidUrlRouter = require('../controllers/notValidUrl');

router.use('/', userRouter);
router.use('/', articlesRouter);
router.use('/', authRouter);
router.use('*', notValidUrlRouter);

module.exports = router;
