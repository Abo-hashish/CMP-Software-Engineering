const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const id = req.params.id; // Get the ID from the URL 

    const index = employee.findIndex(emp => emp.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.splice(index, 1);

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const { name, id } = req.body; // Get name and id from the request body

    if (!name || !id) {
      return res.status(400).json({ message: 'Name and ID are required' });
    }

    const existingEmployee = employee.find(emp => emp.id === id);
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this ID already exists' });
    }

    const newEmployee = { id, name };
    employee.push(newEmployee);

    res.status(201).json({ data: newEmployee, message: 'Employee created successfully' }); // 201 Created status code
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};