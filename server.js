require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer'); 
const upload = multer();
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

app.get('/getHealth', (req, res) => {
  let sql = 'SELECT * FROM mytable WHERE category = "напитки" OR category = "добавки"';
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});

app.get('/getCosmetics', (req, res) => {
  let sql = 'SELECT * FROM mytable WHERE category = "Грижа за лицето" OR category = "Грижа за тялото" OR category = "Лична хигиена"';

  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});

app.get('/getWeightcontrol', (req, res) => {
  let sql = 'SELECT * FROM mytable WHERE category = "Контрол на теглото"';
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});

app.get('/getPackages', (req, res) => {
  let sql = 'SELECT * FROM mytable WHERE category = "Пакети"';
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});


app.get('/getDrinks', (req, res) => {
  let sql = 'SELECT * FROM mytable WHERE category = "Напитки"';
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});

app.get('/getSupplements', (req, res) => {
  let sql = 'SELECT * FROM mytable WHERE category = "Добавки"';
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});

app.get('/getFace', (req, res) => {
  let sql = 'SELECT * FROM mytable WHERE category = "Грижа за лицето"';
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});

app.get('/getBody', (req, res) => {
  let sql = 'SELECT * FROM mytable WHERE category = "Грижа за тялото"';
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});

app.get('/getPersonalhygiene', (req, res) => {
  let sql = 'SELECT * FROM mytable WHERE category = "Лична хигиена"';
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});


app.get('/getProductDetails/:productId', (req, res) => {
  const productId = req.params.productId;
  let sql = 'SELECT * FROM mytable2 WHERE id = ?';
  db.query(sql, [productId], (err, result) => {
    if (err) throw err;
    res.send(result[0]); 
  });
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/submit-form', upload.none(), (req, res) => {

    const { first_name, last_name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASSWORD 
        }
    });

    const mailOptions = {
        from: email,
        to: 'iglika.velichkova@gmail.com',
        subject: 'Сайт - ново съобщение',
        text: `Име и телефон: ${first_name} ${last_name}\nИмейл: ${email}\nСъобщение: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Грешка. Опитайте отново по-късно.' });
      } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ message: 'Съобщението Ви беше изпратено успешно!' });
      }
    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/products.html');
  });
  

app.get('/:page', (req, res, next) => {
  const fileName = path.join(__dirname, `${req.params.page}.html`);
  res.sendFile(fileName, err => {
      if (err) {
          next();
      }
  });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});

