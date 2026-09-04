const { VehicleModel } = require('../models/VehicleModel');

const VehicleService = {
  async createVehicle(vehicleNumber, mobileNumber, data) {
    return VehicleModel.create(vehicleNumber, mobileNumber, data);
  },

  async getVehicles() {
    return VehicleModel.find();
  },

  async getVehicleByNumber(vehicleNumber) {
    return VehicleModel.findByVehicleNumber(vehicleNumber);
  },
  async getAll(){
    return VehicleModel.findAll();
  },
  async updateVehicle(vehicleNumber, phoneNumber) {
    return VehicleModel.vehicleUpdate(vehicleNumber, phoneNumber);
  },
  async updateAction(vehicleNumber,action) {
    return VehicleModel.updateAction(vehicleNumber, action);
  }
};

module.exports = VehicleService;