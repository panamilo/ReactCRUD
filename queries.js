require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CompanyDB',
  password: '123',
  port: 5432,
})
const getEmployees = (request, response) => {
  pool.query('SELECT * FROM employee ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  const getEmployeeById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM employee WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const createEmployee = (request, response) => {
    const { last_name,first_name, date_of_birth,is_active } = request.body
  
    pool.query('INSERT INTO employee (last_name,first_name, date_of_birth,is_active) VALUES ($1, $2 , $3, $4)', [last_name, first_name, date_of_birth,is_active], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
  const updateEmployee = (request, response) => {
    const id = parseInt(request.params.id)
    const { last_name, first_name, date_of_birth,is_active } = request.body
  
    pool.query(
      'UPDATE employee SET last_name = $1, first_name = $2, date_of_birth= $3, is_active=$5 WHERE id = $4',
      [last_name,first_name, date_of_birth, id,is_active],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Employee modified with ID: ${id}`)
      }
    )
  }


  const deleteEmployee = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM employee WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Employee deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  }