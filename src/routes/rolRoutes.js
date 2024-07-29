const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol'); // Verifica esta ruta

// Definir las rutas aquí
router.get('/', rolController.getAllRoles);
router.post('/agregar', rolController.addRol);
router.put('/:id', rolController.updateRol);
router.delete('/:id', rolController.deleteRol);

module.exports = router;
