//modified
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const db = require('./dataBase'); // Ajustar la ruta si es necesario

// Función para manejar el login
exports.loginJWT = async (req, res) => {
  const { email, pass } = req.body;
  
  console.log('Email:', email);  // Log para verificar el email recibido
  console.log('Password:', pass);  // Log para verificar la contraseña recibida

  db.query('SELECT * FROM usuario WHERE email = ?', [email], async (err, result) => {
    if (err) {
      res.status(500).send('Error en el servidor');
      throw err;
    }

    if (result.length === 0) {
      return res.status(401).send('Credenciales inválidas');
    }

    const user = result[0];
    const validPassword = await bcrypt.compare(pass, user.pass);
    
    if (!validPassword) {
      return res.status(401).send('Credenciales inválidas');
    }

    console.log('JWT Secret:', process.env.JWT_SECRET);  // Verifica que la variable de entorno esté definida
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

// Ruta para obtener todos los usuarios (protegida con JWT)
exports.getAllUsersJWT = (req, res) => {
  db.query('SELECT * FROM usuario', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los usuarios');
      throw err;
    }
    res.json(result);
  });
};

// Ruta para agregar un usuario (protegida con JWT)
exports.addUserJWT = (req, res) => {
  const newUser = req.body;

  // Validaciones básicas
  if (!newUser.usuario || !newUser.pass || !newUser.email || !newUser.rol_id || !newUser.apellidoP || !newUser.apellidoM || !newUser.nombre) {
    return res.status(400).send('Usuario, contraseña, email, rol_id, apellidoP, apellidoM y nombre son requeridos');
  }

  // Hashear la contraseña antes de guardarla (bcrypt)
  bcrypt.hash(newUser.pass, 10, (err, hash) => { // 10 es el número de rondas de hashing
    if (err) {
      res.status(500).send('Error al hashear la contraseña');
      throw err;
    }
    newUser.pass = hash;

    // Insertar el nuevo usuario en la base de datos
    db.query('INSERT INTO usuario (usuario, pass, email, apellidoP, apellidoM, nombre, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [newUser.usuario, newUser.pass, newUser.email, newUser.apellidoP, newUser.apellidoM, newUser.nombre, newUser.rol_id], 
    (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar el usuario');
        throw err;
      }
      res.status(201).send('Usuario agregado correctamente');
    });
  });
};
