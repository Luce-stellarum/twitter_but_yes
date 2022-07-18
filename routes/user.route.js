const express = require('express')
const router = express.Router()

const { create_user, login_user } = require('../controllers/user.cont/user.cont')

router.post('/signup', create_user)
router.post('/login', login_user)

module.exports = router