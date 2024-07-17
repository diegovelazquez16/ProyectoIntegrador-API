//modified
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
//Cargar las variables de entorno
require('dotenv').config();
// Configuración de la conexión a la base de datos MySQL
const db = require('./dataBase'); // Ajustar la ruta si es necesario

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM usuario', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los usuarios');
      throw err;
    }
    res.json(result);
  });
};                                                                 

// Agregar un nuevo usuario
exports.addUser = (req, res) => {
  const newUser = req.body;

  // Validaciones básicas
  if (!newUser.usuario || !newUser.pass || !newUser.email || !newUser.rol_id || !newUser.apellidoP || !newUser.apellidoM || !newUser.nombre) {
    return res.status(400).send('Usuario, contraseña, email, rol_id, apellidoP, apellidoM y nombre son requeridos');
  }

  // Hashear la contraseña antes de guardarla (bcrypt)
  bcrypt.hash(newUser.pass, 10, (err, hash) => { // 10 es el número de rondas de hashing
    if (err) {
      if (!res.headersSent) {
        res.status(500).send('Error al hashear la contraseña');
      }
      return;
    }
    newUser.pass = hash;

    // Insertar el nuevo usuario en la base de datos
    db.query('INSERT INTO usuario (usuario, pass, email, apellidoP, apellidoM, nombre, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [newUser.usuario, newUser.pass, newUser.email, newUser.apellidoP, newUser.apellidoM, newUser.nombre, newUser.rol_id],
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

// Actualizar un usuario existente
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  if (updatedUser.pass) {
    bcrypt.hash(updatedUser.pass, 10, (err, hash) => {
      if (err) {
        res.status(500).send('Error al hashear la contraseña');
        return;
      }
      updatedUser.pass = hash;
      db.query('UPDATE usuario SET ? WHERE id = ?', [updatedUser, userId], (err, result) => {
        if (err) {
          res.status(500).send('Error al actualizar el usuario');
          throw err;
        }
        res.send('Usuario actualizado correctamente');
      });
    });
  } else {
    db.query('UPDATE usuario SET ? WHERE id = ?', [updatedUser, userId], (err, result) => {
      if (err) {
        res.status(500).send('Error al actualizar el usuario');
        throw err;
      }
      res.send('Usuario actualizado correctamente');
    });
  }
};

// Eliminar un usuario
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM usuario WHERE id = ?', [userId], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el usuario');
      throw err;
    }
    res.send('Usuario eliminado correctamente');
  });
};
