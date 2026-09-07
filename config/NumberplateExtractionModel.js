const dotenv = require('dotenv')
dotenv.config();


async function ExtractNumber(link) {
    const response = await fetch(process.env.MODEL_API_LINK,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'image_url':link
            })

        }
    );

    if (!response.ok) {
        throw new Error(`Number plate API failed: ${response.status}`);
    }

    const result = await response.json();
    return {
        link,
        vehicle_no: result.vehicle_no ?? result.vehicle_number ?? result.number_plate ?? result
    };

}

module.exports = ExtractNumber;