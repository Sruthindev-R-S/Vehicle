const { getData } = require('../../services/way2api')
const { findVehicleData, insertVehicleData } = require('../../services/supabase');


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

// Main handler for vehicle queries
const handleVehicleQuery = async (req, res) => {
  try {
    const rcNumber = extractRcNumber(req);

    if (!rcNumber) {
      return res.status(400).json({ error: 'Vehicle registration number is required.' });
    }

    const storedVehicle = await findVehicleData(rcNumber);
    if (storedVehicle) {
      return res.status(200).json(storedVehicle.data);
    }

    const vehicleData = await getData(rcNumber);
    await insertVehicleData(
      rcNumber,
      req.body?.mobile_number || req.body?.phone_number|| "000",
      vehicleData
    );
    return res.status(200).json(vehicleData);
  } catch (error) {
    console.error("Error handling vehicle query:", error);
    return res.status(500).json({ error: "Failed to fetch vehicle information." });
  }
};

module.exports = { handleVehicleQuery, extractRcNumber };