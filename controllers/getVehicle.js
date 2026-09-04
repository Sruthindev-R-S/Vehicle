const VehicleService = require('../services/VehicleService');

const getVehicle= async (req,res) =>{
    
    try{
        const data = await VehicleService.getAll()
        if (data.length) {
            return res.status(200).json(data);
        }

        return res.status(404).json({ error: 'No vehicle data found.' });

    }
    catch(error){
        console.error('Error fetching vehicle data:', error);
        return res.status(500).json({ error: 'Failed to fetch vehicle data.' });
    }
        


} 
module.exports={getVehicle}