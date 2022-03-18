import React from 'react';

const EditEmployeeForm = props => {

    const { handleInputChange, submitEmployeeEdit, currentEmployee } = props
    const last_name = currentEmployee.last_name
    const first_name = currentEmployee.first_name
    const date_of_birth = currentEmployee.date_of_birth
    const is_active = currentEmployee.is_active

    return (
        <form onSubmit={submitEmployeeEdit}>
            <label>Last Name</label>
            <input
                type="text"
                id="last_name"
                placeholder="Doe"
                onChange={handleInputChange}
                value={last_name}
            />
            <label>First Name</label>
            <input
                type="text"
                id="first_name"
                placeholder="John"
                onChange={handleInputChange}
                value={first_name}
            />
            <label>Date of Birth</label>
            <input
                type="date"
                id="date_of_birth"
                placeholder="16/10/1998"
                onChange={handleInputChange}
                value={date_of_birth}
            />
            <label>Active</label>
            <input
                type="boolean"
                id="is_active"
                onChange={handleInputChange}
                value={is_active}
            />
            <input type="submit" value="Edit" />
        </form>
    )
}

export default EditEmployeeForm;