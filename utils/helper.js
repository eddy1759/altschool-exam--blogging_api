const CONFIG = require("../config/config");
const jwt = require('jsonwebtoken');
const userModel = require('../model/user')
const {StatusCodes} = require('http-status-codes')

const readingTime = (post) => {
    // get number of words in blogpost
    const wordCount = post.split(' ').length
    // get the number of words per minute
    // assuming an average person reads 200 words per minute
    const countPerMinute = wordCount / 200
    const readingTime = Math.ceil(countPerMinute)
    return ` ${readingTime} Minute Read Time`  
}

const jwtSignToken = (user) => {
    return jwt.sign(user, CONFIG.JWT_SECRET, { expiresIn: CONFIG.EXPIRE_TIME })
}


const validateUser = async(email, password) => {
    let user = await userModel.findOne({
        email: email
    }).select('+password')

    if (!user){
        return false
    }
    const verifyPassword = await user.isValidPassword(password, user.password)
    if(!verifyPassword){
        return false
    }
    return user
}


module.exports = {
    readingTime,
    jwtSignToken,
    validateUser
}