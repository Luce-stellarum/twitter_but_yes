var express = require('express');
var router = express.Router();

const { upload } = require('../services/multipart_upload.serv')

const { create_tweet } = require('../controllers/tweet.cont/create_tweet.cont')
const { get_tweets, get_tweet } = require('../controllers/tweet.cont/get_tweet.cont');

router.post('/create_tweet', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 8 }]), create_tweet)
router.get('/get_tweets', get_tweets)
router.get('/get_tweet/:id', get_tweet)

module.exports = router;
