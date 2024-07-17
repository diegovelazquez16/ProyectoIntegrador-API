const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos');

// Rutas para los endpoints CRUD
router.get('/', pedidosController.getAllPedidos); // Obtener todos los pedidos
router.get('/:id', pedidosController.getPedidoById); // Obtener un pedido por ID
router.post('/agregar', pedidosController.addPedido); // Agregar un nuevo pedido
router.put('/actualizar', pedidosController.updatePedido); // Actualizar un pedido existente
router.delete('/eliminar', pedidosController.deletePedido); // Eliminar un pedido

module.exports = router;
