const twitter_model  = require('../../models/tweet.model')

const create_tweet = async(req, res, next)=>{
    const body = req.body
    try{
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
        console.log(body)

        const new_tweet = new twitter_model(body)
        await new_tweet.save()
        res.status(200).json({
            status: 200,
            msg: "new tweet created"
        })

    }catch(err){
        if(!err.statue){
            err.status = 400
        }
        next(err)
    }
}

module.exports = { create_tweet }