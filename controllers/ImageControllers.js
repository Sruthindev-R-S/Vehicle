const ImageServices =  require("../services/ImageServices")
const ExtractNumber = require("../config/NumberplateExtractionModel")
const ImageDataModel = require("../models/ImageData")

async function Imagehandler(req,res) {
    try{
        const file = req.file;
        const phone_number = req.body;
        const name = req.body;
        if(!file)
        {
            return res.status(400).json({ error: "Upload image not found" });
        }

        const url = await ImageServices.addImage(file);
        const { vehicle_no } = await ExtractNumber(url);
        const data = await ImageServices.addImage(url, vehicle_no,phone_number,name);
        const imageData = data[0];

        return res.status(201).send("Image uploaded sucessfully")


    }
    catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
}

module.exports = { Imagehandler };