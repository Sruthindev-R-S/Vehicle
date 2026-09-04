const router = require('express').Router();
const { dataHandeler } = require('../controllers/MobileAndVehicle');
const {handleVehicleQuery}= require("../controllers/vehicleDetails")
const {employeeHandler}=require("../controllers/EmployeeDetails");
const { addEmployee } = require('../controllers/addEmployee');
const {deleteEmployee} =require('../controllers/deleteEmployee')
const {getVehicle}=require("../controllers/getVehicle")
const { updateVehicle } = require('../controllers/updateVehicle');
const { updateAction } = require('../controllers/updateAction');


router.get('/get', handleVehicleQuery);
router.post('/data',dataHandeler);
router.get('/getEmployee',employeeHandler)
router.post('/addEmployee',addEmployee)
router.delete('/deleteEmployee',deleteEmployee)
router.get('/getVehicle',getVehicle)
router.patch('/updateVehicle', updateVehicle)
router.patch('/updateAction', updateAction)

module.exports = router