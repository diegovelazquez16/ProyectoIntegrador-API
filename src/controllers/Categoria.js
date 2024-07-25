//modified

const mysql = require('mysql2');
require('dotenv').config();
const db = require('../baseDatos/dataBase');

// Obtener todas las categorías
exports.getAllCategorias = (req, res) => {
  db.query('SELECT * FROM categoria', (err, result) => {
    if (err) {
      console.error('Error al obtener las categorías:', err);
      return res.status(500).send('Error al obtener las categorías');
    }
    res.json(result);
  });
};

// Obtener una categoría por ID
exports.getCategoriaById = (req, res) => {
  const categoriaId = req.params.id;
  db.query('SELECT * FROM categoria WHERE id = ?', [categoriaId], (err, result) => {
    if (err) {
      console.error('Error al obtener la categoría:', err);
      return res.status(500).send('Error al obtener la categoría');
    }
    if (result.length === 0) {
      return res.status(404).send('Categoría no encontrada');
    }
    res.json(result[0]);
  });
};

// Agregar una nueva categoría
exports.addCategoria = (req, res) => {
  const newCategoria = req.body;

  // Validaciones básicas
  if (!newCategoria.nombre) {
    return res.status(400).send('El nombre es requerido');
  }

  db.query('INSERT INTO categoria SET ?', newCategoria, (err, result) => {
    if (err) {
      console.error('Error al agregar una nueva categoría:', err);
      return res.status(500).send('Error al agregar una nueva categoría');
    }
    res.status(201).send('Nueva categoría agregada correctamente');
  });
};

// Actualizar una categoría existente
exports.updateCategoria = (req, res) => {
  const categoriaId = req.params.id;
  const updatedCategoria = req.body;

  db.query('UPDATE categoria SET ? WHERE id = ?', [updatedCategoria, categoriaId], (err, result) => {
    if (err) {
      console.error('Error al actualizar la categoría:', err);
      return res.status(500).send('Error al actualizar la categoría');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Categoría no encontrada');
    }
    res.send('Categoría actualizada correctamente');
  });
};

// Eliminar una categoría
exports.deleteCategoria = (req, res) => {
  const categoriaId = req.params.id;
  db.query('DELETE FROM categoria WHERE id = ?', [categoriaId], (err, result) => {
    if (err) {
      console.error('Error al eliminar la categoría:', err);
      return res.status(500).send('Error al eliminar la categoría');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Categoría no encontrada');
    }
    res.send('Categoría eliminada correctamente');
  });
};
