const express = require('express');
const router = express.Router();
const pedidodetalleController = require('./pedidodetalle');

// Ruta para obtener todos los detalles de pedidos
router.get('/pedidodetalle', pedidodetalleController.getAllPedidoDetalles);

// Ruta para obtener un detalle de pedido por ID
router.get('/pedidodetalle/:id', pedidodetalleController.getPedidoDetalleById);

// Ruta para agregar un nuevo detalle de pedido
router.post('/pedidodetalle', pedidodetalleController.addPedidoDetalle);

// Ruta para actualizar un detalle de pedido existente
router.put('/pedidodetalle', pedidodetalleController.updatePedidoDetalle);

// Ruta para eliminar un detalle de pedido
router.delete('/pedidodetalle', pedidodetalleController.deletePedidoDetalle);

module.exports = router;
