const VehicleService = require('../services/VehicleService');

const updateAction = async (req, res) => {
  const { vehicle_number ,action} = req.body || {};

  if (!vehicle_number || action === undefined || action === null || action === '') {
    return res.status(400).json({
      error: 'vehicle_number and action are required.',
    });
  }

  try {
    const updatedVehicle = await VehicleService.updateAction(vehicle_number,action);

    if (!updatedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found.' });
    }

    return res.status(200).json(updatedVehicle);
  } catch (error) {
    console.error('Error updating vehicle action:', error);
    return res.status(500).json({ error: 'Failed to update vehicle status.' });
  }
};

module.exports = { updateAction };