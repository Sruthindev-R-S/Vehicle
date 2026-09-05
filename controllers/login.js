const {generateToken} = require("../utils/security/jwt")
const UserServices = require("../services/userServices")
const {verifypassword} =require("../utils/security/argon2")

const loginHandler= async (req,res)=>{
    const { username,password} = req.body;
    try{
        const user = await UserServices.findUser(username)
        if(!user){
        return  res.status(404).send("User not found");
        }
        const isValid = verifypassword(user.password,password)
        if(isValid)
        {
            const payload={
                username:user.username,
                role:user.role
            }
           const token = generateToken(payload)
            return res.json({
                message:"Login Success",
                token
            })
        }
        else{
           return res.status(401).send("Invalid password")
        }

        

    }
    catch(error){
            return res.status(500).send("Internal server error")
    }
}

module.exports={loginHandler}