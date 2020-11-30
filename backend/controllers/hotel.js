const Hotel = require('../models/Hotel');
const { setCache } = require('../configs/redis');

exports.getHotelsCity = async (req,res,next) => {
    try {
        const {cityname} = req.params;
        if(!cityname) return res.status(400).json({message:'Please provide city name'});

        //filter by
        if(req.query.field && req.query.sort){
            let sortNum = req.query.sort === 'desc' ? -1 : 1;
            const sortedHotels = await Hotel.find({city:cityname}).select('name image rating class reviewCount city country').sort({[req.query.field]:sortNum});
            if(sortedHotels.length === 0) return res.status(404).json({message:'cant find hotels and'});
            if(sortedHotels){
                setCache(req.originalUrl,36000,JSON.stringify(sortedHotels));
                return res.status(200).json(sortedHotels);
            }
        }
        //no filter
        const hotels = await Hotel.find({city:cityname}).select('name image rating class reviewCount city country');
        if(hotels.length === 0) return res.status(404).json({message:'cant find hotels'});

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

exports.getHotelsNearBy = async (req,res,next) => {
    try {
        const {country} = req.params;
        if(!country) return res.status(400).json({message:'please provide a location'});

        const hotelsNearBy = await Hotel.find({country:country}).select('name image rating class reviewCount city country');
        if(hotelsNearBy.length === 0) return res.status(404).json({message:'cant find hotels nearby'});

        setCache(req.originalUrl,36000,JSON.stringify(hotelsNearBy));

        res.status(200).json(hotelsNearBy);
    } catch (error) {
        res.status(500).json({message:'faild get hotel'});
    }
}