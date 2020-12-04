const City = require('../models/City');
const { setCache } = require('../configs/redis');

exports.getAllcities = async (req,res,next) => {
    try {
        const page = req.query.page || 1; 
        const citiesPerPage = 8;
        
        const cities = await City.find({}).skip(citiesPerPage*(page-1)).limit(citiesPerPage);
        if(cities.length === 0) return res.status(404).json({message:'cant find cities'});
        const count = await City.find({}).countDocuments();

        setCache(req.originalUrl,36000,JSON.stringify({
            data:cities,
            count:count
        }));

        res.status(200).json({
            data:cities,
            count:count
        });
    } catch (error) {
        res.status(500).json({message:'faild get cities'});
    }
}

exports.getCityDetails = async (req,res,next) => {
    try {
        const {cityName} = req.params;
        if(!cityName) return res.status(400).json({message:'please provide a city name'});

        const city = await City.findOne({name:cityName});
        if(!city) return res.status(404).json({message:'cant find city details'});

        setCache(req.originalUrl,36000,JSON.stringify(city));

        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({message:'faild get cities'});
    }
}