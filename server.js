require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');



const app = express();
app.use(express.static(__dirname));


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use(cors());

app.get('/getProducts', (req, res) => {
  let sql = 'SELECT * FROM mytable';
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/products.html');
  });
  

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
