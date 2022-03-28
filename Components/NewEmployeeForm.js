import React from 'react';

const NewEmployeeForm = props => {

    const { handleInputChange, submitNewEmployee, currentEmployee } = props
    const last_name = currentEmployee.last_name
    const first_name = currentEmployee.first_name
    const date_of_birth = currentEmployee.date_of_birth
    const is_active = currentEmployee.is_active
  
    return (
        <form onSubmit={submitNewEmployee}>
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
                placeholder="16/10/1998"
                onChange={(e) => handleInputChange(e)}
                value={date_of_birth}
            />
            <label>Active</label>
            <input
                type="boolean"
                id="is_active"
                placeholder=""
                onChange={(e) => handleInputChange(e)}
                value={is_active}
            />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default NewEmployeeForm;