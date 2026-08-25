const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
	process.env.SUPABASE_KEY ||
	process.env.SUPABASE_ANON_KEY ||
	process.env.SUPABASE_SERVICE_ROLE_KEY;

const getSupabaseClient = () => {
	if (!supabaseUrl || !supabaseKey) {
		throw new Error(
			'SUPABASE_URL and SUPABASE_KEY (or SUPABASE_ANON_KEY) are required.'
		);
	}

	return createClient(supabaseUrl, supabaseKey);
};

const insertVehicleData = async (vehicleNumber, mobileNumber, data) => {
	const { data: insertedData, error } = await getSupabaseClient()
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
};

const findVehicleData = async (vehicleNumber) => {
	const { data, error } = await getSupabaseClient()
		.from('vehicle_data')
		.select('*')
		.eq('vehicle_number', vehicleNumber)
		.maybeSingle();

	if (error) {
		throw new Error(`Failed to search vehicle data: ${error.message}`);
	}

	return data;
};

module.exports = { insertVehicleData, findVehicleData };
