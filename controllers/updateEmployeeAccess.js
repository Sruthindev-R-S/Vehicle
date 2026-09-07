const EmployeeService = require('../services/EmployeeServices');

const updateEmployeeAccess = async (req, res) => {
    const { employee_id, status } = req.body || {};

    if (req.user?.role !== 'owner') {
        return res.status(403).json({ error: 'Owner access required.' });
    }

    if (employee_id === undefined || typeof status !== 'boolean') {
        return res.status(400).json({
            error: 'employee_id and boolean status are required.',
        });
    }

    try {
        const employee = await EmployeeService.updateEmployeeAccess(
            employee_id,
            status
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