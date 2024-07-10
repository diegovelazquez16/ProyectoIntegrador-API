const mysql = require('mysql2');
const bcrypt = require('bcrypt');
//Cargar las variables de entorno
require('dotenv').config();
// Configuración de la conexión a la base de datos MySQL
const db=require('./dataBase')
// Obtener todos los elementos
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM tiendaUniformesDeportivos3.usuario', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los elementos');
      throw err;
    }
    res.json(result);
  });
};

// Agregar un nuevo elemento
// Ojo aquí, para evitar el típico quién fue primero el huevo o la gallina
// Nuestro addUser sin autenticación debe considerar enviar la contraseña hasheada
// Si no se hace así tendrían el problema de que requieren un token para agregar 
// un nuevo usuario con la contraseña hasheada pero al mismo tiempo no pueden iniciar
// sesión si no hashean la contraseña antes de validar.
exports.addUser = (req, res) => {
  const newUser = req.body;
  bcrypt.hash(newUser.pass, 10, (err, hash) => {
    if (err) {
      if (!res.headersSent) {
        res.status(500).send('Error al hashear la contraseña');
      }
      return;
    }
    newUser.pass = hash;
    db.query('INSERT INTO usuario (usuario, pass, email, rol_id) VALUES (?, ?, ?, ?)',[newUser.usuario, newUser.pass, newUser.email, newUser.rol_id],
      (error, result) => {
        if (error) {
          if (!res.headersSent) {
            res.status(500).send('Error al agregar un nuevo usuario');
          }
          console.log(error);
          return;
        }
        if (!res.headersSent) {
          res.status(201).send('Nuevo usuario agregado correctamente');
        }
      });
  });
};

// Actualizar un elemento existente
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  db.query('UPDATE usuario SET ? WHERE id = ?', [updatedUser, userId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar el elemento');
      throw err;
    }
    res.send('Elemento actualizado correctamente');
  });
};



// Eliminar un elemento
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM usuario WHERE id = ?', userId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el elemento');
      throw err;
    }
    res.send('Elemento eliminado correctamente');
  });
};