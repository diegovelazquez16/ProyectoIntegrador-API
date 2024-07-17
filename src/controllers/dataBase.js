const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "velasport_2"
  });

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Users-Conexión a la BD establecida');
  });

  module.exports=db;