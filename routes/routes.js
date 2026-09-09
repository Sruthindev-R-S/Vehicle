const router = require('express').Router();
const { dataHandeler } = require('../controllers/MobileAndVehicle');
const {handleVehicleQuery}= require("../controllers/vehicleDetails")
const {employeeHandler}=require("../controllers/EmployeeDetails");
const { addEmployee } = require('../controllers/addEmployee');
const { updateEmployeeAccess } = require('../controllers/updateEmployeeAccess');
const {deleteEmployee} =require('../controllers/deleteEmployee')
const {getVehicle}=require("../controllers/getVehicle")
const { updateVehicle } = require('../controllers/updateVehicle');
const { updateAction } = require('../controllers/updateAction');
const {loginHandler}=require("../controllers/login")
const {registerHandler}=require("../controllers/register")
const {authenticateToken} = require('../middleware/authMiddleWare');
const { Imagehandler } = require('../controllers/ImageControllers');
const { getImageData, updateImageDataStatus } = require('../controllers/ImageDataControllers');
const multer = require('multer');

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 50 * 1024 * 1024 }
});


router.post("/dashboard/login",loginHandler)
router.post("/dashboard/register",registerHandler)
router.get('/Employee/get',  handleVehicleQuery);
router.post('/Employee/data',  dataHandeler);
router.get('/dashboard/getEmployee', employeeHandler) //add authentication
router.post('/Employee/registerEmployee', addEmployee)
router.patch('/dashboard/access', updateEmployeeAccess) //add authentication
router.delete('/dashboard/deleteEmployee', deleteEmployee)
router.get('/dashboard/getVehicle',  getVehicle)
router.patch('/dashboard/updateVehicle', updateVehicle)
router.patch('/dashboard/updateAction',updateAction)
router.get('/dashboard/image-data',  getImageData)
router.patch('/dashboard/image-data/status',updateImageDataStatus)
router.post('/Employee/registerData', upload.single('image'), Imagehandler)


module.exports = router