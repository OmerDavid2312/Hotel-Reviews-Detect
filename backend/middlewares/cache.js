const { client } = require('../configs/redis');
module.exports = (req,res,next) => {
    const cacheKey = req.originalUrl;
    client.get(cacheKey,(err,data)=>{
        if(err){
            throw err
        }
        if (data !== null && data !== '') {
            return res.status(200).json(JSON.parse(data)); //return result from cache and dont next to end middleware.
        }
        next();
    })
}