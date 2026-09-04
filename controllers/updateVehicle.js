const VehicleService = require('../services/VehicleService');

const updateVehicle = async (req, res) => {
    const { vehicle_number, phone_number } = req.body || {};

    if (!vehicle_number || !phone_number) {
        return res.status(400).json({
            error: 'vehicle_number and phone_number are required.',
        });
    }

    try {
        const updatedVehicle = await VehicleService.updateVehicle(
            vehicle_number,
            phone_number
        );

        if (!updatedVehicle.length) {
            return res.status(404).json({ error: 'Vehicle not found.' });
        }

        return res.status(200).json(updatedVehicle[0]);
    } catch (error) {
        console.error('Error updating vehicle:', error);
        return res.status(500).json({ error: 'Failed to update vehicle.' });
    }
};

module.exports = { updateVehicle };