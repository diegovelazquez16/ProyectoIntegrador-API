const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const usersRoutes = require('./routes/users');
const usersJWTRoutes = require('./routes/users_jwt');
const ventasRoutes = require('./routes/ventas');
const productosRoutes = require('./routes/productos');
const categoriasRoutes = require('./routes/categorias');
const pedidosRoutes = require('./routes/pedidos');
const rolRoutes = require('./routes/rolRoutes');
const administradorRoutes = require('./routes/administradorRoutes');
const datosTransferenciaRoutes = require('./routes/datosTransferenciaRoutes');
const pedidodetalleRoutes = require('./routes/pedidodetalleRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware para analizar los cuerpos de las solicitudes
app.use(bodyParser.json());

// Usar las rutas
app.use('/users', usersRoutes);
app.use('/usersJWT', usersJWTRoutes);
app.use('/productos', productosRoutes);
app.use('/ventas', ventasRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/rol', rolRoutes);
app.use('/api/administrador', administradorRoutes);
app.use('/api/datosTransferencia', datosTransferenciaRoutes);
app.use('/api/pedidodetalle', pedidodetalleRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
