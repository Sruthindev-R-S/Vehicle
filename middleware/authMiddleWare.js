const {verifyToken} = require("../utils/security/jwt")

function authenticateToken(req,res,next){
    const authHeader = req.headers.authorization
    if(!authHeader)
        return res.status(401).json({
        message:"Authentication token required"
    })
    const token = authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message:"Invalid authentication format"
        })
    }
    try{
        const decoded = verifyToken(token)
        req.user=decoded
        next()
    }
    catch(error){
        return res.status(403).json({
            message:"Invalid token or token expired"
        })
    }
}

module.exports={authenticateToken}