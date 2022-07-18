const jwt = require('jsonwebtoken')

const secret1 = process.env.SECRET1

const create_token = async(_id, time='60m')=>{
    const payload = {}
    const token = jwt.sign(payload, secret1, {expiresIn: time, issuer: 'twitter_but_yes', audience: String(_id)})
    return token
}

const verify_token = async(tok)=>{
    const verify = jwt.verify(tok, secret1, (err, dec)=>{
        if(err){
            return {
                error: true,
                expiredAt: err.expiredAt
            }
        }
        return dec
    })
    return verify
}

module.exports = { create_token, verify_token } 