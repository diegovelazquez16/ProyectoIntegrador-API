//added
const mysql = require('mysql2');
require('dotenv').config();
const db = require('./dataBase');

// Obtener todos los roles
exports.getAllRoles = (req, res) => {
  db.query('SELECT * FROM rol', (err, result) => {
    if (err) {
      console.error('Error al obtener los roles:', err);
      return res.status(500).send('Error al obtener los roles');
    }
    res.json(result);
  });
};

// Obtener un rol por ID
exports.getRolById = (req, res) => {
  const rolId = req.params.id;
  db.query('SELECT * FROM rol WHERE id = ?', [rolId], (err, result) => {
    if (err) {
      console.error('Error al obtener el rol:', err);
      return res.status(500).send('Error al obtener el rol');
    }
    if (result.length === 0) {
      return res.status(404).send('Rol no encontrado');
    }
    res.json(result[0]);
  });
};

// Agregar un nuevo rol
exports.addRol = (req, res) => {
  const newRol = req.body;
  db.query('INSERT INTO rol SET ?', newRol, (err, result) => {
    if (err) {
      console.error('Error al agregar un nuevo rol:', err);
      return res.status(500).send('Error al agregar un nuevo rol');
    }
    res.status(201).send('Nuevo rol agregado correctamente');
  });
};

// Actualizar un rol existente
exports.updateRol = (req, res) => {
  const { id, ...updatedRol } = req.body;
  db.query('UPDATE rol SET ? WHERE id = ?', [updatedRol, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar el rol:', err);
      return res.status(500).send('Error al actualizar el rol');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Rol no encontrado');
    }
    res.send('Rol actualizado correctamente');
  });
};

// Eliminar un rol
exports.deleteRol = (req, res) => {
  const { id } = req.body;
  db.query('DELETE FROM rol WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el rol:', err);
      return res.status(500).send('Error al eliminar el rol');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Rol no encontrado');
    }
    res.send('Rol eliminado correctamente');
  });
};
