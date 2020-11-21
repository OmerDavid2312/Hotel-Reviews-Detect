const City = require('../models/City');
const { setCache } = require('../configs/redis');

exports.getAllcities = async (req,res,next) => {
    try {
        const cities = await City.find({});
        if(cities.length === 0) return res.status(404).json({message:'cant find cities'});

        setCache(req.params.allcities,36000,JSON.stringify(cities));

        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({message:'faild get cities'});
    }
}