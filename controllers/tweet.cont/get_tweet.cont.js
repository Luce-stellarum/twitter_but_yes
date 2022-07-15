const twitter_model  = require('../../models/tweet.model')

const get_tweets = async(req, res, next)=>{
    try{
        const tweets = await twitter_model.find()
        res.status(200).json({
            status: 200,
            msg: 'all tweets',
            tweets
        })

    }catch(err){
        if(!err.status){
            err.status = 404
        }
        next(err)
    }
}

const get_tweet = async(req, res, next)=>{
    const _id = req.params.id
    try{
        const tweet = await twitter_model.findById(_id)
        res.status(200).json({
            status: 200,
            msg: 'all tweets',
            tweet
        })

    }catch(err){
        if(!err.status){
            err.status = 404
        }
        next(err)
    }
}

module.exports = { get_tweets, get_tweet }