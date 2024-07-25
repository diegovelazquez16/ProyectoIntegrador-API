require('dotenv').config();
const db = require('../baseDatos/dataBase');

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
  const { nombreCliente, apellidoCliente, estado, cantidad, fechaPedido, total } = req.body;

  const newPedido = {
    nombreCliente,
    apellidoCliente,
    estado,
    cantidad,
    fechaPedido,
    total
  };

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
  const idPedido = req.params.id; // ID del pedido para actualizar
  const { nombreCliente, apellidoCliente, estado, cantidad, fechaPedido, total } = req.body; // Recibir todos los campos desde el cuerpo de la solicitud

  // Consulta SQL para actualizar el pedido
  db.query(
    'UPDATE pedidos SET nombreCliente = ?, apellidoCliente = ?, estado = ?, cantidad = ?, fechaPedido = ?, total = ? WHERE idPedido = ?',
    [nombreCliente, apellidoCliente, estado, cantidad, fechaPedido, total, idPedido], // Pasar los valores en el orden correcto
    (err, result) => {
      if (err) {
        console.error('Error al actualizar el pedido:', err);
        return res.status(500).send('Error al actualizar el pedido');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Pedido no encontrado');
      }
      res.send('Pedido actualizado correctamente');
    }
  );
};

// Eliminar un pedido
exports.deletePedido = (req, res) => {
  const { idPedido } = req.body;

  if (!idPedido) {
    return res.status(400).send('ID del pedido es requerido');
  }

  console.log('Intentando eliminar pedido con ID:', idPedido);

  db.query('DELETE FROM pedidos WHERE idPedido = ?', [idPedido], (err, result) => {
    if (err) {
      console.error('Error al eliminar el pedido:', err);
      return res.status(500).send('Error al eliminar el pedido');
    }
    if (result.affectedRows === 0) {
      console.log('Pedido no encontrado con ID:', idPedido);
      return res.status(404).send('Pedido no encontrado');
    }
    console.log('Pedido eliminado correctamente con ID:', idPedido);
    res.send('Pedido eliminado correctamente');
  });
};

