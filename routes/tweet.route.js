const express = require('express')
const router = express.Router()

const {verify_tokens} = require('../middleware/user_verify.mw')

const { upload } = require('../services/multipart_upload.serv')

const { create_tweet, create_tweet_reply } = require('../controllers/tweet.cont/create_tweet.cont')
const { get_tweets, get_tweet } = require('../controllers/tweet.cont/get_tweet.cont');
const { delete_tweet, delete_reply } = require('../controllers/tweet.cont/delete_tweet.cont')

router.post('/create_tweet', verify_tokens, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 8 }]), create_tweet)

router.post('/tweet_reply/:id', verify_tokens, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 8 }]), create_tweet_reply)

router.get('/get_tweets', get_tweets)
router.get('/get_tweet/:id', get_tweet)

router.delete('/delete_tweet/:id', delete_tweet)
router.delete('/delete_reply/:id', delete_reply)

module.exports = router;
