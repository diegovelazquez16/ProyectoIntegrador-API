const express = require('express');
const router = express.Router();
const usersJWTController = require('../controllers/users_jwt');


// Rutas para los endpoints CRUD
router.get('/', usersJWTController.getAllUsersJWT);
router.post('/login', usersJWTController.loginJWT);
router.post('/', usersJWTController.addUserJWT);

module.exports = router;




