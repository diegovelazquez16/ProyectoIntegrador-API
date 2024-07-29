// administradorRoutes.js

const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administrador'); // Asegúrate de que el controlador esté correctamente exportado

// Definición de rutas GET
router.get('/', administradorController.getAllAdministradores);
router.get('/:id', administradorController.getAdministradorById);

// Definición de rutas POST, PUT, DELETE, etc.
router.post('/', administradorController.addAdministrador);
router.put('/:id', administradorController.updateAdministrador);
router.delete('/:id', administradorController.deleteAdministrador);

module.exports = router;
