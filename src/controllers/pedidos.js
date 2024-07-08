const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "mysql",
  database: process.env.DB_NAME || "tiendaUniformesDeportivos3"
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Pedidos-Conexión a la BD establecida');
});

// Obtener todos los pedidos
exports.getAllPedidos = (req, res) => {
  db.query('SELECT * FROM pedidos', (err, result) => {
    if (err) {
      console.error('Error al obtener los pedidos:', err);
      return res.status(500).send('Error al obtener los pedidos');
    }
    res.json(result);
  });
};

// Obtener un pedido por ID
exports.getPedidoById = (req, res) => {
  const pedidoId = req.params.id;
  db.query('SELECT * FROM pedidos WHERE idPedido = ?', [pedidoId], (err, result) => {
    if (err) {
      console.error('Error al obtener el pedido:', err);
      return res.status(500).send('Error al obtener el pedido');
    }
    if (result.length === 0) {
      return res.status(404).send('Pedido no encontrado');
    }
    res.json(result[0]);
  });
};

// Agregar un nuevo pedido
exports.addPedido = (req, res) => {
  const newPedido = req.body;
  db.query('INSERT INTO pedidos SET ?', newPedido, (err, result) => {
    if (err) {
      console.error('Error al agregar un nuevo pedido:', err);
      return res.status(500).send('Error al agregar un nuevo pedido');
    }
    res.status(201).send('Nuevo pedido agregado correctamente');
  });
};

// Actualizar un pedido existente
exports.updatePedido = (req, res) => {
  const { id, ...updatedPedido } = req.body;
  db.query('UPDATE pedidos SET ? WHERE idPedido = ?', [updatedPedido, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar el pedido:', err);
      return res.status(500).send('Error al actualizar el pedido');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Pedido no encontrado');
    }
    res.send('Pedido actualizado correctamente');
  });
};

// Eliminar un pedido
exports.deletePedido = (req, res) => {
  const { id } = req.body;
  db.query('DELETE FROM pedidos WHERE idPedido = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el pedido:', err);
      return res.status(500).send('Error al eliminar el pedido');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Pedido no encontrado');
    }
    res.send('Pedido eliminado correctamente');
  });
};
