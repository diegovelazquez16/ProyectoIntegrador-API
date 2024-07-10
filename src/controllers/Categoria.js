const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const db=require('./dataBase')

//Cargar las variables de entorno
require('dotenv').config();
// Configuración de la conexión a la base de datos MySQL

// Conexión a la base de datos


// Obtener todos los elementos
exports.getAllCategorias = (req, res) => {
    db.query('SELECT * FROM ventas', (err, result) => {
      if (err) {
        res.status(500).send('Error al obtener los elementos');
        throw err;
      }
      res.json(result);
    });
  };
  
  // Agregar un nuevo elemento
  exports.addCategoria = (req, res) => {
    const newUser = req.body;
    db.query('INSERT INTO ventas SET ?', newUser, (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar un nuevo elemento');
        throw err;
      }
      res.status(201).send('Nuevo elemento agregado correctamente');
    });
  };
  
  // Actualizar un elemento existente
  exports.updateCategorias = (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    db.query('UPDATE ventas SET ? WHERE id = ?', [updatedUser, userId], (err, result) => {
      if (err) {
        res.status(500).send('Error al actualizar el elemento');
        throw err;
      }
      res.send('Elemento actualizado correctamente');
    });
  };
  
  // Eliminar un elemento
  exports.deleteCategorias = (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM ventas WHERE id = ?', userId, (err, result) => {
      if (err) {
        res.status(500).send('Error al eliminar el elemento');
        throw err;
      }
      res.send('Elemento eliminado correctamente');
    });
  };
  