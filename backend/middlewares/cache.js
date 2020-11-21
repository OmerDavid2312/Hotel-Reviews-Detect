const { client } = require('../configs/redis');
module.exports = (req,res,next) => {
    const paramsKeysArray = Object.keys(req.params);
    const cacheKey = req.params[paramsKeysArray[paramsKeysArray.length-1]]; //set last param as key on Redis
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