const Pool = require('pg').Pool
const pool = new Pool({
  user: 'milop',
  host: 'localhost',
  database: 'CompanyDB',
  password: '123',
  port: 5432,
});