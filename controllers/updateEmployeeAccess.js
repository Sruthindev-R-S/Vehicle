const EmployeeService = require('../services/EmployeeServices');

const updateEmployeeAccess = async (req, res) => {
    const { employee_id, status } = req.body || {};


    if (employee_id === undefined || (typeof status !== 'boolean' && typeof status !== 'number')) {
        return res.status(400).json({
            error: 'employee_id and valid status (boolean or number) are required.',
        });
    }

    try {
        const normalizedStatus = typeof status === 'boolean' ? (status ? 1 : 2) : Number(status);
        const employee = await EmployeeService.updateEmployeeAccess(
            employee_id,
            normalizedStatus
        );

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }

        return res.status(200).json(employee);
    } catch (error) {
        console.error('Error updating employee access:', error);
        return res.status(500).json({ error: 'Failed to update employee access.' });
    }
};

module.exports = { updateEmployeeAccess };