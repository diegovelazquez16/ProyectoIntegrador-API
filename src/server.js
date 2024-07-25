//ok 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const usersRoutes = require('./routes/users');
const usersJWTRoutes = require('./routes/users_jwt');
const ventasRoutes = require('./routes/ventas');
const productoRouter = require('./routes/producto');
const categoriasRoutes = require('./routes/categorias');
const pedidosRoutes = require('./routes/pedidos');
const rolRoutes = require('./routes/rolRoutes');
const administradorRoutes = require('./routes/administrador');
const datosTransferenciaRoutes = require('./routes/datosTransferencia');
const pedidodetalleRoutes = require('./routes/pedidodetalle');
const imageRoutes = require('./routes/imageRoutes'); 

const app = express();
const port = 3000;

// Middleware para analizar los cuerpos de las solicitudes
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas API deben estar antes de servir archivos estáticos
app.use('/users', usersRoutes);
app.use('/usersJWT', usersJWTRoutes);
app.use('/producto', productoRouter);
app.use('/ventas', ventasRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/api/rol', rolRoutes);
app.use('/api/administrador', administradorRoutes);
app.use('/api/datosTransferencia', datosTransferenciaRoutes);  // Asegúrate de que coincida con el router
app.use('/api/pedidodetalle', pedidodetalleRoutes);

// Añadir la ruta de imágenes antes de servir archivos estáticos
app.use('/', imageRoutes);

// Servir archivos estáticos después de las rutas de la API
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar errores 404
app.use((req, res) => {
  res.status(404).send('Error 404: No encontrado');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log('Servidor Express en ejecución en http://localhost:${port}');
});




