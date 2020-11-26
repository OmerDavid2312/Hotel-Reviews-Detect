const Hotel = require('../models/Hotel');
const { setCache } = require('../configs/redis');

exports.getHotelsCity = async (req,res,next) => {
    try {
        const {cityname} = req.params;
        if(!cityname) return res.status(400).json({message:'Please provide city name'});

        const hotels = await Hotel.find({city:cityname}).select('name image rating class reviewCount city country');
        if(hotels.length === 0) return res.status(404).json({message:'cant find hotels'});

        setCache(req.originalUrl,36000,JSON.stringify(hotels));

        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({message:'faild get hotels'});
    }
}

exports.sortHotelsByField = async (req,res,next) => {
    try {
        const {cityname,field,type} = req.params;
        if(!cityname && !field && !type) return res.status(400).json({message:'Please provide city name, field to sort and sort type'});

        let sortNum = type === 'desc' ? -1 : 1;

        const hotels = await Hotel.find({city:cityname}).select('name image rating class reviewCount city country').sort({[field]:sortNum});
        if(hotels.length === 0) return res.status(404).json({message:'cant find hotels and'});

        setCache(req.originalUrl,36000,JSON.stringify(hotels));

        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({message:'faild get hotels'});
    }
}

exports.getHotelDetail = async (req,res,next) => {
    try {
        const {hotelid} = req.params;
        if(!hotelid) return res.status(400).json({message:'please provide hotel'});

        const hotelDetail = await Hotel.findOne({_id:hotelid});
        if(!hotelDetail) return res.status(404).json({message:'cant find hotel'});

        setCache(req.originalUrl,36000,JSON.stringify(hotelDetail));

        res.status(200).json(hotelDetail);
    } catch (error) {
        res.status(500).json({message:'faild get hotel'});
    }
}