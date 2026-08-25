const router = require('express').Router();
const { dataHandeler } = require('./functions/MobileAndVehicle');
const {handleVehicleQuery}= require("./functions/vehicleDetails")


router.get('/get', handleVehicleQuery);
router.post('/data',dataHandeler)

module.exports = router