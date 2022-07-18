const user_model = require('../../models/user.model')
const bcrypt = require('bcrypt')
const {create_token} = require('../../services/token.serv')

const create_user = async(req, res, next)=>{
    const user = req.body

    try{
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(user.password, salt)
        user.password = hashed

        const new_user = new user_model(user)
        await new_user.save()
        res.status(200).json({
            status: 200,
            msg: "new user created"
        })
    }catch(err){
        if(!err.status){
            err.status = 400
        }
        next(err)
    }
}

const login_user = async(req, res, next)=>{
    const user = req.body
    try{
        const usr = await user_model.findOne({email: user.email})
        if(!usr){
            throw Error("email/password not right")
        }
        const verify = await bcrypt.compare(user.password, usr.password)
        if(!verify){
            throw Error("email/password not right")
        }

        const access_token = await create_token(usr._id)

        res.status(200).json({
            status: 200,
            msg: "new user created",
            access_token
        })
    }catch(err){
        if(!err.status){
            err.status = 400
        }
        next(err)
    }

}

module.exports = { create_user, login_user }