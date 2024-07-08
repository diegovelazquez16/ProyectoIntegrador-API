const express = require('express');
const router = express.Router();
const productosController = require('../controllers/producto.js');

// Rutas para los endpoints CRUD
router.get('/', productosController.getAllProductos); // Obtener todos los productos
router.get('/:id', productosController.getProductoById); // Obtener un producto por ID
router.post('/agregar', productosController.addProducto); // Agregar un nuevo producto
router.put('/actualizar/:id', productosController.updateProducto); // Actualizar un producto existente
router.delete('/eliminar/:id', productosController.deleteProducto); // Eliminar un producto

module.exports = router;
