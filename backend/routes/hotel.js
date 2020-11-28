const express = require('express');
const router = express.Router();
const cache = require('../middlewares/cache');
const isAuth = require('../middlewares/is-auth');

const hotelController = require('../controllers/hotel');

router.get('/:cityname',isAuth,cache,hotelController.getHotelsCity);
router.get('/:cityname/:hotelid',isAuth,cache,hotelController.getHotelDetail);

module.exports = router;
