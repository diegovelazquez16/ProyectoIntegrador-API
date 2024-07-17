const mysql = require('mysql2');
require('dotenv').config();
const db = require('./dataBase');

// Obtener todos los datos de transferencia
exports.getAllDatosTransferencia = (req, res) => {
  db.query('SELECT * FROM datosTransferencia', (err, result) => {
    if (err) {
      console.error('Error al obtener los datos de transferencia:', err);
      return res.status(500).send('Error al obtener los datos de transferencia');
    }
    res.json(result);
  });
};

// Obtener datos de transferencia por ID
exports.getDatosTransferenciaById = (req, res) => {
  const datosTransferenciaId = req.params.id;
  db.query('SELECT * FROM datosTransferencia WHERE id = ?', [datosTransferenciaId], (err, result) => {
    if (err) {
      console.error('Error al obtener los datos de transferencia:', err);
      return res.status(500).send('Error al obtener los datos de transferencia');
    }
    if (result.length === 0) {
      return res.status(404).send('Datos de transferencia no encontrados');
    }
    res.json(result[0]);
  });
};

// Agregar nuevos datos de transferencia
exports.addDatosTransferencia = (req, res) => {
  const newDatosTransferencia = req.body;
  db.query('INSERT INTO datosTransferencia SET ?', newDatosTransferencia, (err, result) => {
    if (err) {
      console.error('Error al agregar nuevos datos de transferencia:', err);
      return res.status(500).send('Error al agregar nuevos datos de transferencia');
    }
    res.status(201).send('Nuevos datos de transferencia agregados correctamente');
  });
};

// Actualizar datos de transferencia existentes
exports.updateDatosTransferencia = (req, res) => {
  const { id, ...updatedDatosTransferencia } = req.body;
  db.query('UPDATE datosTransferencia SET ? WHERE id = ?', [updatedDatosTransferencia, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar los datos de transferencia:', err);
      return res.status(500).send('Error al actualizar los datos de transferencia');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Datos de transferencia no encontrados');
    }
    res.send('Datos de transferencia actualizados correctamente');
  });
};

// Eliminar datos de transferencia
exports.deleteDatosTransferencia = (req, res) => {
  const { id } = req.body;
  db.query('DELETE FROM datosTransferencia WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar los datos de transferencia:', err);
      return res.status(500).send('Error al eliminar los datos de transferencia');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Datos de transferencia no encontrados');
    }
    res.send('Datos de transferencia eliminados correctamente');
  });
};
