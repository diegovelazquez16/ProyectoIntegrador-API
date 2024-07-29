const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../baseDatos/dataBase'); // Ajustar la ruta si es necesario

// Función para manejar el login
exports.loginJWT = async (req, res) => {
  const { email, pass } = req.body;

  console.log('Email:', email);  // Log para verificar el email recibido
  console.log('Password:', pass);  // Log para verificar la contraseña recibida

  if (!email || !pass) {
    return res.status(400).send('Email y contraseña son requeridos');
  }

  db.query('SELECT * FROM usuario WHERE email = ?', [email], async (err, result) => {
    if (err) {
      console.error('Error en el servidor:', err);
      return res.status(500).send('Error en el servidor');
    }

    if (result.length === 0) {
      return res.status(401).send('Credenciales inválidas');
    }

    const user = result[0];

    // Verifica si user.pass está definido
    console.log('Contraseña almacenada:', user.pass);

    if (!user.pass) {
      return res.status(500).send('Error en la contraseña almacenada');
    }

    try {
      const validPassword = await bcrypt.compare(pass, user.pass);

      if (!validPassword) {
        return res.status(401).send('Credenciales inválidas');
      }

      console.log('JWT Secret:', process.env.JWT_SECRET);  // Verifica que la variable de entorno esté definida
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, rol_id: user.rol_id });
    } catch (error) {
      console.error('Error al comparar la contraseña:', error);
      res.status(500).send('Error en el servidor');
    }
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

