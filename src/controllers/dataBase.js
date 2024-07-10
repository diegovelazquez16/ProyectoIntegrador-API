const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "l0p3z2005",
    database: "tiendaUniformesDeportivos3"
  });

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Users-Conexión a la BD establecida');
  });

  module.exports=db;