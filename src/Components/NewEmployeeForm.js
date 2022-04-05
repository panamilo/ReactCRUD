import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";

const NewEmployeeForm = props => {
    const { handleInputChange, submitNewEmployee, currentEmployee } = props
    const last_name = currentEmployee.last_name
    const first_name = currentEmployee.first_name
    const date_of_birth = currentEmployee.date_of_birth
    const is_active = currentEmployee.is_active

    return (
        <form onSubmit={submitNewEmployee}>
            <h3>Add a new Employee</h3>
            <label>Last Name</label>
            <input
                type="text"
                id="last_name"
                placeholder="Doe"
                onChange={(e) => handleInputChange(e)}
                value={last_name}
            />
            <label>First Name</label>
            <input
                type="text"
                id="first_name"
                placeholder="John"
                onChange={(e) => handleInputChange(e)}
                value={first_name}
            />
            <label>Date of birth</label>
            <input
                type="date"
                id="date_of_birth"
                onChange={(e) => handleInputChange(e)}
                value={date_of_birth}
            />
            <label>Active</label>
            <input
                type="checkbox" style={{ marginLeft: 5 }}
                id="is_active"
                values={is_active}
                onChange={(e) => handleInputChange(e)}
                
              /> <br></br>
            <input type="submit" value="Submit" onClick={<Alert variant="success">
  <Alert.Heading> Entry Successfully edited. </Alert.Heading>
  </Alert>}/>
            
        </form>
    )
   
}

export default NewEmployeeForm;