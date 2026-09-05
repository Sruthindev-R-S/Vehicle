const argon2 =  require("argon2")
async function hashPassword(password) {
    return await argon2.hash(password)

    
}
async function verifypassword(hashedPassword,password) {
    return await argon2.verify(hashedPassword,password)
}

module.exports={hashPassword,verifypassword}
