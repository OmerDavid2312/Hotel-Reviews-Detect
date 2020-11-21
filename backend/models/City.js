const mongoose = require('mongoose'); 

const geoSchema = mongoose.Schema({
    lat:{ type: Number, required:true},
    long:{ type: Number, required:true}
})
const citySchema = mongoose.Schema({
    name: { type: String, required:true , unique: true},
    country: { type: String, required:true },
    geo: { type: geoSchema },
    image: { type: String, required:true },
});

module.exports = mongoose.model("city", citySchema);