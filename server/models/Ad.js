const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    url: {type: String},
    icon: { type: String},
})

module.exports = mongoose.model("Ad" ,schema);