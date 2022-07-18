const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config({path: './.env'})

const mongo_connect = require('./services/mongodb.serv')
mongo_connect.connect

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const tweet_route = require('./routes/tweet.route')
const user_route = require('./routes/user.route')

app.use('/tweet', tweet_route)
app.use('/user', user_route)

app.use((req, res)=> {
  res.status(404).json({Error: "No Such route"})
})

app.use((err, req, res, next) => {
  console.log(`${err.status || 500}: ${err.message}`)
  if (err.code === 'LIMIT_FILE_SIZE') {
      err.status = 400;
  }
  if(err.message.startsWith("E11000")){
      err.message = "Username/Email already exist"
  }
  if(err.message.startsWith("Cast to ObjectId")){
    err.message = "No such tweet"
}
  res.status(err.status || 500);
  res.json({"Error": err.message || 'Internal server error'})

});

module.exports = app;
