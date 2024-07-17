const express = require('express');
const router = express.Router();
const administradorController = require('./administrador');

// Ruta para obtener todos los administradores
router.get('/administradores', administradorController.getAllAdministradores);

// Ruta para obtener un administrador por ID
router.get('/administradores/:id', administradorController.getAdministradorById);

// Ruta para agregar un nuevo administrador
router.post('/administradores', administradorController.addAdministrador);

// Ruta para actualizar un administrador existente
router.put('/administradores', administradorController.updateAdministrador);

// Ruta para eliminar un administrador
router.delete('/administradores', administradorController.deleteAdministrador);

module.exports = router;
