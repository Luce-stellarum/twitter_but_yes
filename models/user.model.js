const mongoose = require('mongoose')

const user = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "username not provided"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email not provided"]
    },
    password: {
        type: String, 
        required: [true, "password not provided"]
    },
    avatar: {
        type: String,
        default: ""
    }
}, {timestapm: true})

module.exports = mongoose.model('user', user)