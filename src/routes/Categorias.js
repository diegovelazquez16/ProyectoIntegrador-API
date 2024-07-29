const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoria');

// Verifica que todos los métodos del controlador están definidos y exportados correctamente
router.get('/', categoriasController.getAllCategorias);
router.post('/agregar', categoriasController.addCategoria);
router.put('/:id', categoriasController.updateCategoria);
router.delete('/:id', categoriasController.deleteCategoria);

module.exports = router;
