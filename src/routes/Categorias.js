const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/Categoria');

// Rutas para los endpoints CRUD
router.get('/', categoriaController.getAllCategorias);
router.post('/', categoriaController.addCategoria);
router.put('/:id', categoriaController.updateCategorias);
router.delete('/:id', categoriaController.deleteCategorias);

module.exports = router;