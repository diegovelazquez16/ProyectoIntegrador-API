const express = require('express');
const router = express.Router();
const productosController = require('../controllers/producto.js');

// Rutas para los endpoints CRUD
router.get('/', productosController.getAllproductos);
router.post('/agregar', productosController.addproducto);
router.put('/actualizar', productosController.deleteproducto);

module.exports = router;