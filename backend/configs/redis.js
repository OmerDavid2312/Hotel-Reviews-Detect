let createClient = require("redis").createClient;

let client = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.auth(process.env.REDIS_PASSWORD);

client.on("connect", () => {
  console.log("Connected to Redis database");
});
client.on("error", (error) => {
  console.error("Connection to Redis database failed! ==>" + error);
});

module.exports = {
  client: client,
  setCache: (key, seconds, value) => {
    client.setex(key, seconds, value);
  },
};
