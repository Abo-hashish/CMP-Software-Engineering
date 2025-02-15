function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.dataset.id = item.id; // Store ID in data attribute
        deleteButton.addEventListener('click', deleteEmployee); // Add listener here
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

//TODO Add event listener to submit button
const employeeForm = document.getElementById('employeeForm');
employeeForm.addEventListener('submit', createEmployee);


function createEmployee(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const idInput = document.getElementById('id');
  const name = nameInput.value;
  const id = idInput.value;

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, id })
  })
    .then(response => response.json())
    .then(data => {
      nameInput.value = '';
      idInput.value = '';
      fetchEmployees(); 
    })
    .catch(error => console.error('Error creating employee:', error));
}


function deleteEmployee(event) {
  const button = event.target;
  const id = button.dataset.id; 

  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        fetchEmployees(); 
      } else {
        console.error('Error deleting employee:', response.status);
      }
    })
    .catch(error => console.error('Error deleting employee:', error));
}

fetchEmployees()