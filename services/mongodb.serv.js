const mongoose = require('mongoose')

const connect = mongoose.connect(`mongodb+srv://wahaha:${process.env.MONGOP}@cluster-yes.no20h.mongodb.net/?retryWrites=true&w=majority`)

const conn = mongoose.connection

conn.on('open', ()=>{
    console.log("Connected to remote db initiated.....")
})

conn.on('error', (err)=>{
    console.log(err.msg)
})

module.exports = connect