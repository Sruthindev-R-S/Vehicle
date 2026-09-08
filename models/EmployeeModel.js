const supabase = require('../config/supabase.js');

const EmployeeModel={
    async create(name,phone_number){
        const {data,error}= await supabase
        .from("employee")
        .insert({
            Name:name,
            Phone_number:phone_number,
        })
        .select("Name,Phone_number,Id");
        if(error)
            throw error;
        return data
    },
    async find(){
        const {data,error}= await supabase
        .from("employee")
        .select("Name,Phone_number,Id,status");
        if(error)
            throw error;
        return data;
    },
    async updateAccess(id, status){
        const {data,error}= await supabase
        .from("employee")
        .update({ status })
        .eq("Id", id)
        .select("Name,Phone_number,Id,status")
        .maybeSingle();
        if(error)
            throw error;
        return data;
    },
    async delete(number){
        const {data,error}=await supabase
        .from("employee")
        .delete()
        .eq("Phone_number",number)
        .select();
        if(error)
          throw error;
        return data;
        
    }
}

module.exports = EmployeeModel