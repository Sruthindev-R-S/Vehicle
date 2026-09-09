const ImageDataServices = require('../services/ImageDataServices');
const { getData } = require('../config/way2api');
const VehicleService = require('../services/VehicleService');

const getImageData = async (req, res) => {
    try {
        const imageData = await ImageDataServices.getImageData();
        return res.status(200).json(imageData);
    } catch (error) {
        console.error('Error fetching image data:', error);
        return res.status(500).json({ error: 'Failed to fetch image data.' });
    }
};

const updateImageDataStatus = async (req, res) => {
    const { vehicle_number, id, old_vehicle_number, created_by } = req.body || {};

    if (!vehicle_number && !id) {
        return res.status(400).json({ error: 'vehicle_number or id is required.' });
    }

    try {
        const imageData = await ImageDataServices.updateImageDataStatus(vehicle_number, id, old_vehicle_number);

        if (!imageData || !imageData.length) {
            return res.status(404).json({ error: 'Image data not found.' });
        }

        const vehicleData = await getData(imageData[0].vehicle_number);
        await VehicleService.createVehicle(
            imageData[0].vehicle_number,
            req.body?.mobile_number || req.body?.phone_number || '000',
            vehicleData,
            created_by
        );


        return res.status(200).send('Data Added To DB');
    } catch (error) {
        console.error('Error updating image data status:', error);
        return res.status(500).json({ error: 'Failed to update image data status.' });
    }
};

module.exports = { getImageData, updateImageDataStatus };