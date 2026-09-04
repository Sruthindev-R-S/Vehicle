const EmployeeService = require('../services/EmployeeServices');

const deleteEmployee = async (req, res) => {
  const { phone_number } = req.query;

  if (!phone_number) {
    return res.status(400).json({ error: 'phone_number is required.' });
  }

  try {
    const deletedEmployee = await EmployeeService.deleteEmployee(phone_number);

    if (!deletedEmployee.length) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    return res.status(200).json(deletedEmployee);
  } catch (error) {
    console.error('Error deleting employee:', error);
    return res.status(500).json({ error: 'Failed to delete employee.' });
  }
};

module.exports={deleteEmployee}