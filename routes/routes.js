const router = require('express').Router();
const getData = require('../services/way2api');

// Mock data builder
const getMockData = (rcNumber) => ({
  rc_number: rcNumber || 'KL56Z7333',
  fit_up_to: '2040-03-24',
  registration_date: '2025-03-25',
  owner_name: 'NAVATHEJ C K',
  father_name: '',
  present_address: 'Kozhikode, 673305',
  permanent_address: 'Kozhikode, 673305',
  mobile_number: '',
  vehicle_category: '2WN',
  vehicle_chasi_number: 'ME3K5B6FGR1001386',
  vehicle_engine_number: 'K5W6FGR1003996',
  maker_description: 'ROYAL-ENFIELD (UNIT OF EICHER LTD)',
  maker_model: 'GUERRILLA 450',
  body_type: 'SOLO WITH PILLION (MOTORCYCLE)',
  fuel_type: 'PETROL',
  color: 'BRAVA BLUE',
  norms_type: 'BHARAT STAGE VI',
  financer: 'IDFC FIRST BANK LTD',
  financed: true,
  insurance_company: 'Oriental Insurance Co. Ltd.',
  insurance_policy_number: '411700/31/2025/ABRE/16256',
  insurance_upto: '2029-10-21',
  manufacturing_date: '7/2024',
  manufacturing_date_formatted: '2024-07',
  registered_at: 'KOILANDY SRTO, Kerala',
  latest_by: '2026-08-17',
  less_info: true,
  tax_upto: '2039-09-30',
  tax_paid_upto: '2039-09-30',
  cubic_capacity: '451.65',
  vehicle_gross_weight: '376',
  no_cylinders: '1',
  seat_capacity: '2',
  sleeper_capacity: '0',
  standing_capacity: '0',
  wheelbase: '1440',
  unladen_weight: '185',
  vehicle_category_description: 'M-Cycle/Scooter(2WN)',
  pucc_number: 'KL05600170028635',
  pucc_upto: '2027-03-25',
  permit_number: '',
  permit_issue_date: null,
  permit_valid_from: null,
  permit_valid_upto: null,
  permit_type: '',
  national_permit_number: '',
  national_permit_upto: null,
  national_permit_issued_by: null,
  non_use_status: null,
  non_use_from: null,
  non_use_to: null,
  blacklist_status: '',
  noc_details: '',
  owner_number: '1',
  rc_status: 'ACTIVE',
  masked_name: false,
  challan_details: null,
  variant: null,
  rto_code: '',
  response_metadata: {
    masked_chassis: false,
    masked_engine: false,
    masked_owner_name: false
  }
});

// Extract vehicle registration number from body, query, or parameters
const extractRcNumber = (req) => {
  return (
    req.body?.rc ||
    req.body?.vehicle_no ||
    req.body?.vehicle_number ||
    req.body?.rc_number ||
    req.body?.registration_number ||
    req.body?.rcNumber ||
    req.query?.rc ||
    req.query?.vehicle_no ||
    req.query?.vehicle_number ||
    req.query?.rc_number ||
    ''
  );
};

// Main handler for vehicle queries
const handleVehicleQuery = async (req, res) => {
  try {
    const rcNumber = extractRcNumber(req);
    const mockData = getMockData(rcNumber);

    if (process.env.WAY2API_TOKEN && rcNumber) {
      try {
        const liveData = await getData(rcNumber);
        if (liveData) {
          return res.status(200).json({ ...mockData, ...liveData });
        }
      } catch (err) {
        console.warn("Way2API fetch error, using fallback vehicle data:", err.message);
      }
    }

    return res.status(200).json(mockData);
  } catch (error) {
    console.error("Error handling vehicle query:", error);
    return res.status(500).json({ error: "Failed to fetch vehicle information." });
  }
};

// Map endpoints for POST and GET
router.post('/get', handleVehicleQuery);
router.get('/get', handleVehicleQuery);
router.post('/getInfo', handleVehicleQuery);
router.get('/getInfo', handleVehicleQuery);

module.exports = router;