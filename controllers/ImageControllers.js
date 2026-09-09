const ImageServices =  require("../services/ImageServices")
const ExtractNumber = require("../config/NumberplateExtractionModel")
const ImageDataModel = require("../models/ImageData")

async function Imagehandler(req, res) {
    try {
        let file = req.file;
        const phone_number = req.body?.phone_number || req.body?.mobile_number || '';
        const name = req.body?.name || '';

        // If not multipart file, check if sent as base64 in json body
        if (!file && (req.body?.image || req.body?.vehicle_image)) {
            const rawBase64 = req.body.image || req.body.vehicle_image;
            const base64Data = rawBase64.replace(/^data:image\/\w+;base64,/, '');
            file = {
                originalname: `vehicle_${Date.now()}.jpg`,
                buffer: Buffer.from(base64Data, 'base64'),
                mimetype: 'image/jpeg'
            };
        }

        if (!file) {
            return res.status(400).json({ error: "Upload image not found" });
        }

        const url = await ImageServices.addImage(file);
        const { vehicle_no } = await ExtractNumber(url);
        const data = await ImageDataModel.add(url, vehicle_no, phone_number, name);
        const imageData = data ? data[0] : null;

        return res.status(201).json({
            message: "Image uploaded successfully",
            vehicle_number: vehicle_no,
            imageUrl: url,
            data: imageData
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

module.exports = { Imagehandler };