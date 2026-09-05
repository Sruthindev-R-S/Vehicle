const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE

function generateToken(payload){
    return jwt.sign(payload,JWT_SECRET,{
        expiresIn:JWT_EXPIRE
    })
}
function verifyToken(token){
    return jwt.verify(token,JWT_SECRET)
}

module.exports = {generateToken,verifyToken}