const router = require('express').Router();
const { notValidUrl } = require('../controllers/notValidUrl');

router.use('*', notValidUrl);
