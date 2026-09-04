const supabase = require('../config/supabase.js');

const EmployeeModel={
    async create(name,phone_number){
        const {data,error}= await supabase
        .from("employee")
        .insert({
            Name:name,
            Phone_number:phone_number
        })
        .select();
        if(error)
            throw error;
        return data
    },
    async find(){
        const {data,error}= await supabase
        .from("employee")
        .select("Name,Phone_number");
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