var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var userSchema = new Schema({
    name: String,
    title: String,
    mobile: String,
    company: String,
    pwd: String,
    score: Number
})

var smsSchema = new Schema({
    mobile: String,
    type: String,
    code: String,
    time: Number
})

module.exports = {
    user: userSchema,
    sms: smsSchema
}
