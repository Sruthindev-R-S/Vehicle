const EmployeeModel= require("../models/EmployeeModel")

const EmployeeServices = {
    async addEmployee(name,phone_number){
        return EmployeeModel.create(name,phone_number)
    },
    async getEmployee(){
        return EmployeeModel.find()
    },
    async updateEmployeeAccess(id, status){
        return EmployeeModel.updateAccess(id, status)
    },
    async deleteEmployee(phone_number){
        return EmployeeModel.delete(phone_number)
    }
}

module.exports=EmployeeServices