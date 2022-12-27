const express = require('express')
const routers = express.Router()

const {signupUser,loginUser } = require('../controller/userController')


routers.post('/signup',signupUser)

routers.post('/login',loginUser)

module.exports = routers;

