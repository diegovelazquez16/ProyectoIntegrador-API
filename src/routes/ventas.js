const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.js');

// Rutas para los endpoints CRUD
router.get('/', ventasController.getAllVentas); // Obtener todas las ventas
router.get('/:id', ventasController.getVentaById); // Obtener una venta por ID
router.post('/agregar', ventasController.addVenta); // Agregar una nueva venta
router.put('/actualizar/:id', ventasController.updateVenta); // Actualizar una venta existente
router.delete('/eliminar/:id', ventasController.deleteVenta); // Eliminar una venta

module.exports = router;
