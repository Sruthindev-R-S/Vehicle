const router = require('express').Router();
const { dataHandeler } = require('../controllers/MobileAndVehicle');
const {handleVehicleQuery}= require("../controllers/vehicleDetails")
const {employeeHandler}=require("../controllers/EmployeeDetails");
const { addEmployee } = require('../controllers/addEmployee');
const {deleteEmployee} =require('../controllers/deleteEmployee')
const {getVehicle}=require("../controllers/getVehicle")
const { updateVehicle } = require('../controllers/updateVehicle');
const { updateAction } = require('../controllers/updateAction');
const {loginHandler}=require("../controllers/login")
const {registerHandler}=require("../controllers/register")
const {authenticateToken} = require('../middleware/authMiddleWare')


router.post("/login",loginHandler)
router.post("/register",registerHandler)
router.get('/get', authenticateToken, handleVehicleQuery);
router.post('/data', authenticateToken, dataHandeler);
router.get('/getEmployee', authenticateToken, employeeHandler)
router.post('/addEmployee', authenticateToken, addEmployee)
router.delete('/deleteEmployee', authenticateToken, deleteEmployee)
router.get('/getVehicle', authenticateToken, getVehicle)
router.patch('/updateVehicle', authenticateToken, updateVehicle)
router.patch('/updateAction', authenticateToken, updateAction)



module.exports = router