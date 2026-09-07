const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error(
		'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.'
	);
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;





