const fetch = require('node-fetch');
const { setCache } = require('../configs/redis');
const toCelcius = oldegree => Math.round(parseFloat(oldegree)-273.15);

exports.getWeather = async (req,res,next)=>{
    try {
        const {lat , long} = req.params;
        if(!lat && !long) return json.status(404).json({message:'Please provide lat and long'});

        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.WEATHER_API_KEY}`;
        const response = await fetch(URL);
        const data = await response.json();

        const results = {
            temp: toCelcius(data.main.temp),
            location:{
                city:data.name,
                country:data.sys.country
            },
            desc:data.weather[0].description
        };

        if(results){
            setCache(req.originalUrl,36000,JSON.stringify(results))
            return res.json(200).json(results)
        } else{
            return res.json(404).json({message:'Cant find weather information'});
        }


    } catch (error) {
        res.status(500).json({message:'faild GET weather information'});
    }

}