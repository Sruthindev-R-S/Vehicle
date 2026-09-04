const EmployeeModel = require("../models/EmployeeModel")


const employeeHandler = async (req,res)=>{
    try{
        const Employee=await EmployeeModel.find();
        if(Employee)
        {
            res.status(200).send(Employee)
        }

    }
    catch(error){
        res.status(500).send("Database error",error)
    }
}

module.exports={employeeHandler}

