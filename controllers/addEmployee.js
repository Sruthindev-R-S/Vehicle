const EmployeeService = require('../services/EmployeeServices');

const addEmployee = async (req, res) => {
    const { name, phone_number } = req.body || {};

    if (!name || !phone_number) {
        return res.status(400).json({
            error: 'name and phone_number are required.',
        });
    }

    try {
        const employee = await EmployeeService.addEmployee(name, phone_number);
        return res.status(201).json(employee);
    } catch (error) {
        console.error('Error adding employee:', error);
        return res.status(500).json({ error: 'Failed to add employee.' });
    }
};

module.exports= {addEmployee}