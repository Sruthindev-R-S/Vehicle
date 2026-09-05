const supabase = require('../config/supabase.js');

const UserModel = {
    async  create(username,password) {
        const {data,error}= await supabase
        .from("user")
        .insert({
            username:username,
            password:password
        })
        if(error)
            throw error;
        return data
    },
    async find(username){
        const {data,error}=await supabase
        .from("user")
        .select("username,password,role")
        .eq("username",username)
        if(error)
            throw error;
        return data[0]
    }
    
}

module.exports=UserModel