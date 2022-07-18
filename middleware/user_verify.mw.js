const {verify_token} = require('../services/token.serv')
const verify_tokens = async(req, res, next)=>{
    var token = req.header("Authorization")
    try{
        if(!token){
            res.status(404).json({
                status: 404,
                msg: "token not found"
            })
        }

        if(token.startsWith("Bearer")){
            token = token.split(" ")[1]
        }
        var verify = await verify_token(token)
        if(verify.error){
            res.status(400).json({
                status: 403,
                msg: "invalid token"
            })
        }
        req.userid = verify.aud
        next()

    }catch(err){
        console.log(err)

        res.status(400).json({
            status: 400,
            msg: err.msg
        })
    }
}
module.exports = { verify_tokens }