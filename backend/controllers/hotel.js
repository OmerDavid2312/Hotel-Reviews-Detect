const Hotel = require('../models/Hotel');
const { setCache } = require('../configs/redis');

exports.getHotelsCity = async (req,res,next) => {
    try {
        const {cityname} = req.params;
        if(!cityname) return res.status(400).json({message:'Please provide city name'});

        const hotels = await Hotel.find({city:cityname}).select('name image rating class reviewCount city country');
        if(hotels.length === 0) return res.status(404).json({message:'cant find hotels'});

        setCache(cityname,36000,JSON.stringify(hotels));

        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({message:'faild get hotels'});
    }
}
exports.getHotelDetail = async (req,res,next) => {
    try {
        const {cityname,hotelid} = req.params;
        if(!cityname && !hotelid) return res.status(400).json({message:'please provide hotel name and city name'});

        const hotelDetail = await Hotel.findOne({city:cityname,_id:hotelid});
        if(!hotelDetail) return res.status(404).json({message:'cant find hotel'});

        setCache(hotelid,36000,JSON.stringify(hotelDetail));

        res.status(200).json(hotelDetail);
    } catch (error) {
        res.status(500).json({message:'faild get hotel'});
    }
}