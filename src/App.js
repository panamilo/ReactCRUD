import React, { useState, useEffect } from 'react';
import NewEmployeeForm from './Components/NewEmployeeForm';
import EditEmployeeForm from './Components/EditEmployeeForm';
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";



const App = () => {

  const initialFormState = {
    id: '',
    last_name: '',
    first_name: '',
    date_of_birth: '',
    is_active: false
  }
  const [employees, setEmployees] = useState([])
  const [currentEmployee, setCurrentEmployee] = useState(initialFormState)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    fetchEmployees();
  }, [])

  const fetchEmployees = async () => {
    const result = await fetch(`http://localhost:8080/employee`)
    result
      .json()
      .then(results => {setEmployees(results)})
      .catch(e => console.log(e))
  }

  const handleInputChange = event => {
    const { id, value } = event.target
    setCurrentEmployee({ ...currentEmployee, [id]: value })
  }

  const handleCheckboxChange = event => {
    console.log(event)
    setCurrentEmployee({...currentEmployee, is_active: !currentEmployee.is_active})
  }

  const submitNewEmployee = async (event) => {
    event.preventDefault()

    const response = await fetch('http://localhost:8080/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentEmployee),
    })
    response
      .json()
      .then(result => setEmployees(result))
      .catch(e => console.log(e))

    fetchEmployees()
    setCurrentEmployee(initialFormState)
  }

  const deleteEmployee = async (item) => {
    const response = await fetch(`http://localhost:8080/employee/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    response
      .json()
      .then(result => setEmployees(result), fetchEmployees())
      .catch(e => console.log(e))
  }

  const editEmployee = item => {
    console.log(item)
    setEditing(true)
    setCurrentEmployee({ id: item.id, last_name: item.last_name,first_name: item.first_name, date_of_birth: item.date_of_birth, is_active: item.is_active })
  }

  const submitEmployeeEdit = async (event) => {
    event.preventDefault()

    const response = await fetch(`http://localhost:8080/employee/${currentEmployee.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentEmployee),
    })
    response
      .json()
      .then(result => setEmployees(result))
      .catch(e => console.log(e))

    fetchEmployees()
    setCurrentEmployee(initialFormState)
    setEditing(false)

  }

  function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

  return (
    <div className="container">
      <h1>A panamilo CRUD Application</h1>
      <h5>A simple app to create, read, update and delete data with React, Express, Node, PostgreSQL</h5>

      <div className="flex-row">
        {editing ?
          <div className="flex-large">
            <EditEmployeeForm
              submitEmployeeEdit={submitEmployeeEdit}
              handleInputChange={handleInputChange}
              handleCheckboxChange={handleCheckboxChange}
              currentEmployee={currentEmployee}
            />
          </div>
          :
          <div className="flex-large">
            <NewEmployeeForm
              submitNewEmployee={submitNewEmployee}
              handleInputChange={handleInputChange}
              currentEmployee={currentEmployee}
              
            />
            
          </div>
        }

        <div className="flex-large">
        <h3>List of current Employees</h3>
          <table>
            <thead>
              <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Date of Birth</th>
                <th>Activity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(item =>
                <tr key={item.id}>
                  <td>{item.last_name}</td>
                  <td>{item.first_name}</td>
                  <td> {convertDate(item.date_of_birth)} </td>
                  <td><input type="checkbox" style={{ marginLeft: 15 }} disabled={true} checked={item.is_active} /></td>
                  <td>
                    <button onClick={() => editEmployee(item)} className="muted-button" >Edit</button>
                    <button onClick={() => deleteEmployee(item)} style={{ marginLeft: 5 }} className="muted-button" >Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;