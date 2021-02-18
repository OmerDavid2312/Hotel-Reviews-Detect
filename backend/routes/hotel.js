const express = require("express");
const router = express.Router();
const cache = require("../middlewares/cache");
const isAuth = require("../middlewares/is-auth");

const hotelController = require("../controllers/hotel");

//favorite
router.patch("/favorite/:hotelid", isAuth, hotelController.addToFavorite);
router.get("/favorite", isAuth, hotelController.getFavorite);
//hotels near by
router.get(
  "/hotelsnearby/:country",
  isAuth,
  cache,
  hotelController.getHotelsNearBy
);
//get hotels in city
router.get("/:cityname", isAuth, cache, hotelController.getHotelsCity);
//get specific hotel detail
router.get(
  "/:cityname/:hotelid",
  isAuth,
  cache,
  hotelController.getHotelDetail
);

module.exports = router;
