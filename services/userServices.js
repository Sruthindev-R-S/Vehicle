const UserModel = require("../models/userModel")

const UserServices = {
    async addUser(username,password){
        return UserModel.create(username,password)
    },
    async findUser(username){
        return UserModel.find(username)
    }
}
module.exports=UserServices