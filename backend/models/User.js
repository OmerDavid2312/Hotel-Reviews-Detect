const mongoose = require('mongoose');
const { collection } = require('./Hotel');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required:true },
    name: { type: String, required:true}
});

module.exports = mongoose.model("user", userSchema);