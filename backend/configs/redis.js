const redis = require("redis");
const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});

client.on('connect', () => {
    console.log('Connected to Redis database');
});
client.on("error", (error) => {
    console.error('Connection to Redis database failed! ==>' + error);
});

module.exports = {
    client:client,
    setCache:(key,seconds,value)=>{
        client.setex(key,seconds,value);
    }
};