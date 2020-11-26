const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/is-auth');
const cache = require('../middlewares/cache');

const citiesController = require('../controllers/cities');
router.get('',isAuth,cache,citiesController.getAllcities);

module.exports = router;