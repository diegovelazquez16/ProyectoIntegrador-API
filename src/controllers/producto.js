const mysql = require('mysql2');
require('dotenv').config();
const db = require('../baseDatos/dataBase');


// Obtener todos los productos
exports.getAllProductos = (req, res) => {
  db.query('SELECT * FROM producto', (err, result) => {
    if (err) {
      console.error('Error al obtener los productos:', err);
      return res.status(500).send('Error al obtener los productos');
    }
    res.json(result);
  });
};

// Obtener un producto por ID
exports.getProductoById = (req, res) => {
  const productoId = req.params.id;
  db.query('SELECT * FROM producto WHERE id = ?', [productoId], (err, result) => {
    if (err) {
      console.error('Error al obtener el producto:', err);
      return res.status(500).send('Error al obtener el producto');
    }
    if (result.length === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(result[0]);
  });
};

// Agregar un nuevo producto
exports.addProducto = (req, res) => {
  const { nombreP, precio, talla, descripcion, idCategoria } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : null;

  
  // Convertir idCategoria a entero
  const idCategoriaInt = parseInt(idCategoria, 10);

  // Verificar si la conversión fue exitosa
  if (isNaN(idCategoriaInt)) {
    console.error('Valor inválido para idCategoria:', idCategoria);
    return res.status(400).json({ error: 'Categoría inválida' });
  }

  db.query(
    'INSERT INTO producto (nombreP, precio, talla, descripcion, idCategoria, imagenurl) VALUES (?, ?, ?, ?, ?, ?)',
    [nombreP, precio, talla, descripcion, idCategoriaInt, imagen],
    (err) => {
      if (err) {
        console.error('Error al insertar el producto:', err);
        return res.status(500).json({ error: 'Error al agregar un nuevo producto' });
      }
      res.status(201).json({ message: 'Nuevo producto agregado correctamente' });
    }
  );
};



// Actualizar un producto existente
exports.updateProducto = (req, res) => {
  const productoId = req.params.id;
  const { nombreP, precio, talla, idCategoria, descripcion } = req.body;
  const imagen = req.file ? req.file.filename : null;

  db.query(
    'UPDATE producto SET nombreP = ?, precio = ?, talla = ?, idCategoria = ?, descripcion = ?, imagenurl = ? WHERE id = ?',
    [nombreP, precio, talla, idCategoria, descripcion, imagen, productoId],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar el producto:', err);
        return res.status(500).send('Error al actualizar el producto');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Producto no encontrado');
      }
      res.send('Producto actualizado correctamente');
    }
  );
};

// Eliminar un producto
exports.deleteProducto = (req, res) => {
  const productoId = req.params.id;
  db.query('DELETE FROM producto WHERE id = ?', [productoId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el producto:', err);
      return res.status(500).send('Error al eliminar el producto');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.send('Producto eliminado correctamente');
  });
};

