const { getData } = require('../config/way2api')
const VehicleService = require('../services/VehicleService');


const extractRcNumber = (req) => {
  return (
    req.body?.rc ||
    req.body?.vehicle_no ||
    req.body?.vehicle_number ||
    req.body?.rc_number ||
    req.body?.registration_number ||
    req.body?.rcNumber ||
    req.query?.rc ||
    req.query?.vehicle_no ||
    req.query?.vehicle_number ||
    req.query?.rc_number ||
    ''
  );
};

const handleVehicleQuery = async (req, res) => {
  try {
    const rcNumber = extractRcNumber(req);

    if (!rcNumber) {
      return res.status(400).json({ error: 'Vehicle registration number is required.' });
    }

    const storedVehicle = await VehicleService.getVehicleByNumber(rcNumber);
    if (storedVehicle) {
      return res.status(200).json(storedVehicle.data);
    }

    const vehicleData = await getData(rcNumber);
    res.status(200).json(vehicleData);
    try{
      await VehicleService.createVehicle(
      rcNumber,
      req.body?.mobile_number || req.body?.phone_number|| "000",
      vehicleData
    );
    }
    catch(error){
      console.error("Database Insertion failed:",error)
    }
    
    
  } catch (error) {
    console.error("Error handling vehicle query:", error);
    return res.status(500).json({ error: "Failed to fetch vehicle information." });
  }
};

module.exports = { handleVehicleQuery, extractRcNumber };