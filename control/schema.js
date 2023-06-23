const mongoose = require('mongoose')
const sechema = mongoose.Schema
 const testmony = sechema({
    firstName: String,
    email: String,
    phone: String,
    text: String,
    lastName : String 
})
module.exports = {testmony}