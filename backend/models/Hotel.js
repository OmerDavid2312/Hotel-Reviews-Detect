const mongoose = require('mongoose'); //TODO : add the result from ML response to reviewSchema 
const reviewsSchema = mongoose.Schema({
    title: { type: String, required:true },
    rating: {type: Number,enum:[1,2,3,4,5]},
    desc: { type: String, required:true },
    user: { type: String, required:true },
});
const hotelSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: String, required:true },
    image: {type: String, required:true},
    rating: {type: Number,enum:[1,2,3,4,5]},
    class: {type: Number,enum:[1,2,3,4,5]},
    about: { type: String, required:true },
    reviewCount: { type: String, required:true },
    city: { type: String, required:true },
    country: { type: String, required:true },
    reviews: [reviewsSchema]
});

module.exports = mongoose.model("hotel", hotelSchema);