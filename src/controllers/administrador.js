const mysql = require('mysql2');
require('dotenv').config();
const db = require('../baseDatos/dataBase');


// Obtener todos los administradores
exports.getAllAdministradores = (req, res) => {
  db.query('SELECT * FROM administradores', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los administradores');
      throw err;
    }
    res.json(result);
  });
};

// Obtener un administrador por su ID
exports.getAdministradorById = (req, res) => {
  const administradorId = req.params.id;
  db.query('SELECT * FROM administradores WHERE id = ?', administradorId, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener el administrador');
      throw err;
    }
    res.json(result);
  });
};

// Agregar un nuevo administrador
exports.addAdministrador = (req, res) => {
  const newAdministrador = req.body;
  db.query('INSERT INTO administradores SET ?', newAdministrador, (err, result) => {
    if (err) {
      res.status(500).send('Error al agregar un nuevo administrador');
      throw err;
    }
    res.status(201).send('Nuevo administrador agregado correctamente');
  });
};

// Actualizar un administrador existente
exports.updateAdministrador = (req, res) => {
  const administradorId = req.params.id;
  const updatedAdministrador = req.body;
  db.query('UPDATE administradores SET ? WHERE id = ?', [updatedAdministrador, administradorId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar el administrador');
      throw err;
    }
    res.send('Administrador actualizado correctamente');
  });
};

// Eliminar un administrador
exports.deleteAdministrador = (req, res) => {
  const administradorId = req.params.id;
  db.query('DELETE FROM administradores WHERE id = ?', administradorId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el administrador');
      throw err;
    }
    res.send('Administrador eliminado correctamente');
  });
};