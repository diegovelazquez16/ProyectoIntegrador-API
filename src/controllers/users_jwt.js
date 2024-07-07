const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Configuración de la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "tiendaUniformesDeportivos3"
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conexión a la base de datos establecida');
});

// Función para manejar el login
exports.login = async (req, res) => {
  const { email, pass } = req.body;
  
  // Consultar la base de datos para encontrar al usuario por su email
  db.query('SELECT * FROM Usuario WHERE email = ?', [email], async (err, result) => {
    if (err) {
      res.status(500).send('Error en el servidor');
      throw err;
    }
    
    // Verificar si se encontró un usuario con ese email
    if (result.length === 0) {
      return res.status(401).send('Credenciales inválidas');
    }
    
    const user = result[0];

    // Verificar la contraseña usando bcrypt
    const validPassword = await bcrypt.compare(pass, user.pass);
    if (!validPassword) {
      return res.status(401).send('Credenciales inválidas');
    }

    // Generar un token JWT con el ID del usuario
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30h' });
    res.json({ token });
  });
};

// Middleware de autenticación JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    // Verificar el token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Prohibido (token inválido)
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // No autorizado (sin token)
  }
};

// Ruta para obtener todos los usuarios (protegida con JWT)
exports.getAllUsers = [authenticateJWT, (req, res) => {
  db.query('SELECT * FROM Usuario', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los usuarios');
      throw err;
    }
    res.json(result);
  });
}];

// Ruta para agregar un usuario (protegida con JWT)
exports.addUser = [authenticateJWT, (req, res) => {
  const newUser = req.body;
  
  // Validaciones básicas
  if (!newUser.usuario || !newUser.pass || !newUser.email || !newUser.rol_id) {
    return res.status(400).send('Usuario, contraseña, email y rol_id son requeridos');
  }

  // Hashear la contraseña antes de guardarla (bcrypt)
  bcrypt.hash(newUser.pass, 10, (err, hash) => { // 10 es el número de rondas de hashing
    if (err) {
      res.status(500).send('Error al hashear la contraseña');
      throw err;
    }
    newUser.pass = hash;

    // Insertar el nuevo usuario en la base de datos
    db.query('INSERT INTO usuario SET ?', newUser, (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar el usuario');
        throw err;
      }
      res.status(201).send('Usuario agregado correctamente');
    });
  });
}];
