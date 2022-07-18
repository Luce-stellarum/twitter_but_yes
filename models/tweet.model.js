const mongoose = require('mongoose').set('debug', true)

const tweet = mongoose.Schema({
    parent_tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tweet'
    },
    child_tweet: [
        {twe : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tweet'
        }}
    ],
    description: {
        type: String,
        default: ""
    },
    image: {
        type: Array,
        default: []
    },
    video: {
        type: Array,
        default: []
    },
    is_child: {
        type: Boolean,
        default: false
    },
    like: {
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }



}, { timestamps: true })


module.exports = mongoose.model('tweet', tweet)
