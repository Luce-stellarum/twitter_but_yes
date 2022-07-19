const tweet_model  = require('../../models/tweet.model')
const {unlink} = require('fs')

const delete_tweet = async(req, res, next)=>{
    const _id = req.params.id

    try{
        const del_tweet = await tweet_model.findByIdAndDelete(_id)
        if(!del_tweet){
            throw Error("no tweet found")
        }
        if(del_tweet.image.length >= 1){
            del_tweet.image.forEach((item)=>{
                unlink("./" + item, (err) => {
                    if (err) throw err;
                })
            })
        }
        if(del_tweet.video.length >= 1){
            del_tweet.video.forEach((item)=>{
                unlink("./" + item, (err) => {
                    if (err) throw err;
                })
            })
        }

        res.status(200).json({
            status: 200,
            msg: "tweet deleted"
        })
    }catch(err){
        if(!err.status){
            err.status = 404
        }
        next(err)
    }
}

const delete_reply = async(req, res, next)=>{
    const _id = req.params.id

    try{
        const del_tweet = await tweet_model.findByIdAndDelete(_id)
        console.log(del_tweet)
        if(!del_tweet){
            throw Error("no tweet found")
        }
        if(del_tweet.image.length <= 1){
            del_tweet.image.forEach((item)=>{
                unlink(item)
            })
        }
        if(del_tweet.video.length <= 1){
            del_tweet.video.forEach((item)=>{
                unlink(item)
            })
        }

        const parent = await tweet_model.findByIdAndUpdate({_id: del_tweet.parent_tweet}, {$pull: { child_tweet: {twe: del_tweet._id} }})

        res.status(200).json({
            status: 200,
            msg: "tweet deleted"
        })
    }catch(err){
        // console.log(err)
        if(!err.status){
            err.status = 404
        }
        next(err)
    }
}

module.exports = { delete_tweet, delete_reply }