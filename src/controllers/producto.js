const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "mysql",
  database: process.env.DB_NAME || "tiendaUniformesDeportivos3"
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la BD establecida');
});

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
  const newProducto = req.body;
  db.query('INSERT INTO producto SET ?', newProducto, (err, result) => {
    if (err) {
      console.error('Error al agregar un nuevo producto:', err);
      return res.status(500).send('Error al agregar un nuevo producto');
    }
    res.status(201).send('Nuevo producto agregado correctamente');
  });
};

// Actualizar un producto existente
exports.updateProducto = (req, res) => {
  const productoId = req.params.id;
  const updatedProducto = req.body;
  db.query('UPDATE producto SET ? WHERE id = ?', [updatedProducto, productoId], (err, result) => {
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
