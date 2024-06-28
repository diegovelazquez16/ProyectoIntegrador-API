const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "tienda"
  });

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('producto-Conexión a la BD establecida');
  });

  exports.getAllproductos = (req, res) => {
    db.query('SELECT * FROM producto', (err, result) => {
      if (err) {
        res.status(500).send('Error al obtener los elementos');
        throw err;
      }
      res.json(result);
    });
  };
  
  // Agregar un nuevo elemento
  exports.addproducto = (req, res) => {
    const newUser = req.body;
    db.query('INSERT INTO producto SET ?', newUser, (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar un nuevo elemento');
        throw err;
      }
      res.status(201).send('Nuevo elemento agregado correctamente');
    });
  };
  
  // Actualizar un elemento existente
  exports.updateproducto = (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    db.query('UPDATE producto SET ? WHERE id = ?', [updatedUser, userId], (err, result) => {
      if (err) {
        res.status(500).send('Error al actualizar el elemento');
        throw err;
      }
      res.send('Elemento actualizado correctamente');
    });
  };
  
  // Eliminar un elemento
  exports.deleteproducto = (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM producto WHERE id = ?', userId, (err, result) => {
      if (err) {
        res.status(500).send('Error al eliminar el elemento');
        throw err;
      }
      res.send('Elemento eliminado correctamente');
    });
  };
  
