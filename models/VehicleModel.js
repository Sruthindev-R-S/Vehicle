const supabase = require('../config/supabase.js');

const VehicleModel = {
	async create(vehicleNumber, mobileNumber, data) {
		const { data: insertedData, error } = await supabase
			.from('vehicle_data')
			.upsert(
				{
					vehicle_number: vehicleNumber,
					mobile_number: mobileNumber,
					data,
				},
				{ onConflict: 'vehicle_number' }
			)
			.select()
			.single();

		if (error) {
			throw new Error(`Failed to insert vehicle data: ${error.message}`);
		}

		return insertedData;
	},

	async find() {
		const { data, error } = await supabase
			.from('vehicle_data')
			.select('*');

		if (error) {
			throw new Error(`Failed to fetch vehicle data: ${error.message}`);
		}

		return data;
	},

	async findByVehicleNumber(vehicleNumber) {
		const { data, error } = await supabase
			.from('vehicle_data')
			.select('*')
			.eq('vehicle_number', vehicleNumber)
			.maybeSingle();

		if (error) {
			throw new Error(`Failed to search vehicle data: ${error.message}`);
		}

		return data;
	},
	async findAll(){
		const {data,error} = await supabase
		.from("vehicle_data")
		.select("*")
		if(error)
            throw error;
        return data;

	},
	async vehicleUpdate(vehicleNumber, phoneNumber) {
		const { data, error } = await supabase
			.from('vehicle_data')
			.update({ mobile_number: phoneNumber })
			.eq('vehicle_number', vehicleNumber)
			.select()
			.maybeSingle();

		if (error) {
			throw new Error(`Failed to update vehicle data: ${error.message}`);
		}

		return data ? [data] : [];
	},
	async updateAction(vehicleNumber, action) {
		const { data, error } = await supabase
			.from('vehicle_data')
			.update({ status :action})
			.eq('vehicle_number', vehicleNumber)
			.select()
			.maybeSingle();

		if (error) {
			throw new Error(`Failed to update vehicle status: ${error.message}`);
		}

		return data;
	}
};

module.exports = { VehicleModel }
