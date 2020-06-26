const router = require('express').Router();
const { getUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.get('/users/me', auth, getUser);

module.exports = router;
