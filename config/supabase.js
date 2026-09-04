const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error(
		'SUPABASE_URL and SUPABASE_KEY (or SUPABASE_ANON_KEY) are required.'
	);
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;





