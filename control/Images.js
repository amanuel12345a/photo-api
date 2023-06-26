const mongoose = require('mongoose')
const schema = mongoose.Schema
const images = schema({
    image: String,
    imageType: [String], 
})
module.exports = {images}