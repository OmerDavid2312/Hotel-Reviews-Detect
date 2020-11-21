const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/is-auth');
const cache = require('../middlewares/cache');

const weatherController = require('../controllers/weather');

router.get('/:lat/:long',isAuth,cache,weatherController.getWeather);

module.exports = router;