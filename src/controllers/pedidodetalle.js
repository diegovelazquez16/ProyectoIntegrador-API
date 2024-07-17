const mysql = require('mysql2');
require('dotenv').config();
const db = require('./dataBase');

// Obtener todos los detalles de pedidos
exports.getAllPedidoDetalles = (req, res) => {
  db.query('SELECT * FROM pedidodetalle', (err, result) => {
    if (err) {
      console.error('Error al obtener los detalles de pedidos:', err);
      return res.status(500).send('Error al obtener los detalles de pedidos');
    }
    res.json(result);
  });
};

// Obtener un detalle de pedido por ID
exports.getPedidoDetalleById = (req, res) => {
  const detalleId = req.params.id;
  db.query('SELECT * FROM pedidodetalle WHERE id = ?', [detalleId], (err, result) => {
    if (err) {
      console.error('Error al obtener el detalle de pedido:', err);
      return res.status(500).send('Error al obtener el detalle de pedido');
    }
    if (result.length === 0) {
      return res.status(404).send('Detalle de pedido no encontrado');
    }
    res.json(result[0]);
  });
};

// Agregar un nuevo detalle de pedido
exports.addPedidoDetalle = (req, res) => {
  const newPedidoDetalle = req.body;
  db.query('INSERT INTO pedidodetalle SET ?', newPedidoDetalle, (err, result) => {
    if (err) {
      console.error('Error al agregar un nuevo detalle de pedido:', err);
      return res.status(500).send('Error al agregar un nuevo detalle de pedido');
    }
    res.status(201).send('Nuevo detalle de pedido agregado correctamente');
  });
};

// Actualizar un detalle de pedido existente
exports.updatePedidoDetalle = (req, res) => {
  const { id, ...updatedPedidoDetalle } = req.body;
  db.query('UPDATE pedidodetalle SET ? WHERE id = ?', [updatedPedidoDetalle, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar el detalle de pedido:', err);
      return res.status(500).send('Error al actualizar el detalle de pedido');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Detalle de pedido no encontrado');
    }
    res.send('Detalle de pedido actualizado correctamente');
  });
};

// Eliminar un detalle de pedido
exports.deletePedidoDetalle = (req, res) => {
  const { id } = req.body;
  db.query('DELETE FROM pedidodetalle WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el detalle de pedido:', err);
      return res.status(500).send('Error al eliminar el detalle de pedido');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Detalle de pedido no encontrado');
    }
    res.send('Detalle de pedido eliminado correctamente');
  });
};
