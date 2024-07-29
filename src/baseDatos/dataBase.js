const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "Velasport_4"
  });

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Users-Conexión a la BD establecida');
  });

  module.exports=db;