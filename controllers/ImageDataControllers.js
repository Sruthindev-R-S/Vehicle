const ImageDataServices = require('../services/ImageDataServices');

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
    const { vehicle_number } = req.body || {};

    if (!vehicle_number) {
        return res.status(400).json({ error: 'vehicle_number is required.' });
    }

    try {
        const imageData = await ImageDataServices.updateImageDataStatus(vehicle_number);

        if (!imageData.length) {
            return res.status(404).json({ error: 'Image data not found.' });
        }

        return res.status(200).json(imageData);
    } catch (error) {
        console.error('Error updating image data status:', error);
        return res.status(500).json({ error: 'Failed to update image data status.' });
    }
};

module.exports = { getImageData, updateImageDataStatus };