const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos');

// Rutas para los endpoints CRUD
router.get('/', pedidosController.getAllPedidos);
router.post('/', pedidosController.addPedidos);
router.put('/:id', pedidosController.updatePedidos);
router.delete('/:id', pedidosController.deletePedidos);

module.exports = router;