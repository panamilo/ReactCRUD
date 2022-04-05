import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";


const EditEmployeeForm = props => {

    const { handleInputChange, submitEmployeeEdit, currentEmployee, handleCheckboxChange } = props
    const last_name = currentEmployee.last_name
    const first_name = currentEmployee.first_name
    const date_of_birth = currentEmployee.date_of_birth
    const is_active=currentEmployee.is_active
        console.log(date_of_birth)


        function convertDate(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat)
            return [pad(d.getFullYear()), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
          }

    return (
        <form onSubmit={submitEmployeeEdit}>
            <h3>Edit this Employee entry</h3>
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
                onChange={handleInputChange}
                value={convertDate(date_of_birth)}
            />
            <label>Active</label>
            <input
                type="checkbox" style={{ marginLeft: 5 }}
                id="is_active"
                onChange={handleCheckboxChange}
                checked={is_active}
                value={is_active}
            /> <br></br>
            <input type="submit" value="Edit" />
        </form>
    )
}

export default EditEmployeeForm;