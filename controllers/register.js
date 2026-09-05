const UserServices = require("../services/userServices")
const {hashPassword} = require("../utils/security/argon2")

const registerHandler = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            })
        }

        const existingUser = await UserServices.findUser(username)
        if (existingUser) {
            return res.status(409).json({
                message: "Username already exists"
            })
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await UserServices.addUser(username, hashedPassword)

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                username: newUser[0]?.username || username
            }
        })
    }
    catch (error) {
        console.error("Register error:", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = { registerHandler }
