const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const db = require('./queries')
const cors = require("cors")

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/employee', db.getEmployees)
app.get('/employee/:id', db.getEmployeeById)
app.post('/employee', db.createEmployee)
app.put('/employee/:id', db.updateEmployee)
app.delete('/employee/:id', db.deleteEmployee)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})