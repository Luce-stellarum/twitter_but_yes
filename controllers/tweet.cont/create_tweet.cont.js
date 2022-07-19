const tweet_model  = require('../../models/tweet.model')
const user_model  = require('../../models/user.model')
const {unlink} = require('fs')

const create_tweet = async(req, res, next)=>{
    const body = req.body
    try{
        const usr = await user_model.findById(req.userid)
        if(!usr){
            if(req.files){
                if(req.files.image){
                    unlink(req.file.image.path)
                }
                if(req.files.video){
                    unlink(req.file.video.path)
                }
            }
            throw Error("no user found")
        }
        body['user'] = usr._id
        var image = []
        var video = []
        if(req.files){
            if(req.files.image){
                req.files.image.forEach(it => {
                    image.push(it.path)
                });
                console.log(req.files)
    
                body['image'] = image
            }
            if(req.files.video){
                req.files.video.forEach(it => {
                    video.push(it.path)
                });
    
                body['video'] = video
            }
        }
        const new_tweet = new tweet_model(body)
        await new_tweet.save()
        res.status(200).json({
            status: 200,
            msg: "new tweet created"
        })

    }catch(err){
        console.log(err)
        if(!err.statue){
            err.status = 400
        }
        next(err)
    }
}


const create_tweet_reply = async(req, res, next)=>{
    const _id = req.params.id
    const body = req.body
    console.log(_id)
    try{
        const parent = await tweet_model.findById(_id)
        if(!parent){
            throw Error("no tweet found")
        }
        const usr = await user_model.findById(req.userid)
        if(!usr){
            if(req.files){
                if(req.files.image){
                    unlink(req.file.image.path)
                }
                if(req.files.video){
                    unlink(req.file.video.path)
                }
            }
            throw Error("no user found")
        }
        body['user'] = usr._id
        var image = []
        var video = []
        if(req.files){
            if(req.files.image){
                req.files.image.forEach(it => {
                    image.push(it.path)
                });
                console.log(req.files)
    
                body['image'] = image
            }
            if(req.files.video){
                req.files.video.forEach(it => {
                    video.push(it.path)
                });
    
                body['video'] = video
            }
        }
        body['parent_tweet'] = _id
        body['is_child'] = true
        const new_tweet = new tweet_model(body)
        const new_reply = await new_tweet.save()

        const up_parent = await tweet_model.findOneAndUpdate({_id}, {$push: {child_tweet: {twe: new_reply._id}}},)
        res.status(200).json({
            status: 200,
            msg: "tweet replied"
        })
    }catch(err){
        console.log(err)
        if(!err.status){
            err.status = 404
        }
        next(err)
    }
}

module.exports = { create_tweet, create_tweet_reply }