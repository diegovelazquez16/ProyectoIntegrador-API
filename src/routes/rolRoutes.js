const express = require('express');
const router = express.Router();
const rolController = require('./rol');

// Ruta para obtener todos los roles
router.get('/roles', rolController.getAllRoles);

// Ruta para obtener un rol por ID
router.get('/roles/:id', rolController.getRolById);

// Ruta para agregar un nuevo rol
router.post('/roles', rolController.addRol);

// Ruta para actualizar un rol existente
router.put('/roles', rolController.updateRol);

// Ruta para eliminar un rol
router.delete('/roles', rolController.deleteRol);

module.exports = router;
