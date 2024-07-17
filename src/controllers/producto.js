//modified
const mysql = require('mysql2');
require('dotenv').config();
const db = require('./dataBase');
const multer = require('multer');

// Configuración de multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
  db.query('SELECT * FROM producto WHERE idProducto = ?', [productoId], (err, result) => {
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
exports.addProducto = [
  upload.single('img'), // Middleware de multer para manejar la carga de un solo archivo con el campo 'img'
  (req, res) => {
    const { nombreP, precio, talla, idCategoria, descripcion } = req.body;

    // Verificar si se recibió un archivo de imagen
    if (!req.file) {
      return res.status(400).send('No se ha recibido la imagen del producto');
    }

    const img = req.file.buffer; // Acceder al buffer de la imagen

    db.query(
      'INSERT INTO producto (nombreP, precio, talla, idCategoria, descripcion, img) VALUES (?, ?, ?, ?, ?, ?)',
      [nombreP, precio, talla, idCategoria, descripcion, img],
      (err) => {
        if (err) {
          console.error('Error al insertar el producto:', err);
          return res.status(500).send('Error al agregar un nuevo producto');
        }

        res.status(201).send('Nuevo producto agregado correctamente');
      }
    );
  },
];

// Actualizar un producto existente
exports.updateProducto = (req, res) => {
  const productoId = req.params.id;
  const updatedProducto = req.body;
  
  // Verificar si se va a actualizar la imagen
  if (req.file) {
    updatedProducto.img = req.file.buffer;
  }

  db.query('UPDATE producto SET ? WHERE idProducto = ?', [updatedProducto, productoId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el producto:', err);
      return res.status(500).send('Error al actualizar el producto');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.send('Producto actualizado correctamente');
  });
};

// Eliminar un producto
exports.deleteProducto = (req, res) => {
  const productoId = req.params.id;
  db.query('DELETE FROM producto WHERE idProducto = ?', [productoId], (err, result) => {
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
