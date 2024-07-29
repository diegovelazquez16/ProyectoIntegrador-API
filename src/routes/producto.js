const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto'); // Asegúrate de que la ruta sea correcta
const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Corrige la ruta si es necesario
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rutas para los endpoints CRUD
router.get('/', productoController.getAllProductos); // Obtener todos los productos
router.get('/:id', productoController.getProductoById); // Obtener un producto por ID
router.post('/agregar', upload.single('imagen'), productoController.addProducto); // Agregar un nuevo producto
router.put('/actualizar/:id', upload.single('imagen'), productoController.updateProducto); // Actualizar un producto existente
router.delete('/eliminar/:id', productoController.deleteProducto); // Eliminar un producto

module.exports = router;
