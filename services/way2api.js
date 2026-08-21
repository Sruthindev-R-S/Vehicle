const dotenv = require('dotenv');
dotenv.config();


async function getData(vehicle_no)
{
   
 try {
        const apiResponse = await fetch('https://app.way2api.com/api/v1/rc/verify', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.WAY2API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rc_number: vehicle_no
            })
        });
        const responseJson = await apiResponse.json();

        if (!responseJson.success || !responseJson.data || !responseJson.data.result) {
            throw new Error(responseJson.message || 'Invalid response structure from Way2API');
        }

        const result = responseJson.data.result;
        console.log(result);
        const insurance_upto = result.insurance_upto;
        const policy_number = result.insurance_policy_number;
        const policy_company = result.insurance_company;
        const insurance_data={
            insurance_upto,
            policy_number,
            policy_company
        }
        return insurance_data;

    }
    catch (error) {
        console.error('Error making API request:', error);
        throw error;
    }
} 
module.exports = getData;