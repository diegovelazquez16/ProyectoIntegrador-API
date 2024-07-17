const express = require('express');
const router = express.Router();
const datosTransferenciaController = require('./datosTransferencia');

// Ruta para obtener todos los datos de transferencia
router.get('/datosTransferencia', datosTransferenciaController.getAllDatosTransferencia);

// Ruta para obtener datos de transferencia por ID
router.get('/datosTransferencia/:id', datosTransferenciaController.getDatosTransferenciaById);

// Ruta para agregar nuevos datos de transferencia
router.post('/datosTransferencia', datosTransferenciaController.addDatosTransferencia);

// Ruta para actualizar datos de transferencia existentes
router.put('/datosTransferencia', datosTransferenciaController.updateDatosTransferencia);

// Ruta para eliminar datos de transferencia
router.delete('/datosTransferencia', datosTransferenciaController.deleteDatosTransferencia);

module.exports = router;
