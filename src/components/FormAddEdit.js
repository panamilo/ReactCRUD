import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function AddEditForm(props) {
  const[form, setValues] = useState({
    id: 0,
    first_name: '',
    last_name: '',
    is_active: '',
    date_of_birth: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: form.first_name,
        last_name: form.last_name,
        is_active: form.is_active,
        date_of_birth: form.date_of_birth
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          props.addItemToState(item[0])
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  const submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: form.first_name,
        last_name: form.last_name,
        is_active: form.is_active,
        date_of_birth: form.date_of_birth
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          props.updateState(item[0])
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if(props.item){
      const { id, first_name, last_name, is_active, date_of_birth } = props.item
      setValues({ id, first_name, last_name, is_active, date_of_birth })
    }
  }, false)

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="first_name">First Name</Label>
        <Input type="text" name="first_name" id="first_name" onChange={onChange} value={form.first_name === null ? '' : form.first} />
      </FormGroup>
      <FormGroup>
        <Label for="last_name">Last Name</Label>
        <Input type="text" name="last_name" id="last_name" onChange={onChange} value={form.last_name === null ? '' : form.last}  />
      </FormGroup>
      <FormGroup>
        <Label for="is_active">Active</Label>
        <Input type="boolean" name="is_active" id="is_active" onChange={onChange} value={form.is_active === null ? '' : form.is_active}  />
      </FormGroup>
      <FormGroup>
        <Label for="date_of_birth">Date of Birth</Label>
        <Input type="date" name="date_of_birth" id="date_of_birth" onChange={onChange} value={form.date_of_birth === null ? '' : form.date_of_birth} />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  )
}

export default AddEditForm