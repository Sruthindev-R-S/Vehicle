const VehicleService = require('../services/VehicleService');
const { getData } = require('../config/way2api');

const dataHandeler = async (req, res) => {
  try {
    const { vehicle_number, mobile_number } = req.body;

    if (!vehicle_number) {
      return res.status(400).json({ error: 'vehicle_number is required.' });
    }

    const storedVehicle = await VehicleService.getVehicleByNumber(vehicle_number);
    if (storedVehicle) {
      
      return res.status(200).send("Data alredy exist");
    }

    const data = await getData(vehicle_number);
    await VehicleService.createVehicle(
      vehicle_number,
      mobile_number,
      data
    );

    return res.status(201).send("Data stored to database");
  } catch (error) {
    console.error('Error handling vehicle data:', error);
    return res.status(500).json({ error: 'Failed to process vehicle data.' });
  }
};

module.exports={dataHandeler}