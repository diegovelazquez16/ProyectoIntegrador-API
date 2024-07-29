const mysql = require('mysql2');
require('dotenv').config();
const db = require('../baseDatos/dataBase');

// Obtener todos los datos de transferencia
exports.getAllDatosTransferencia = (req, res) => {
  db.query('SELECT * FROM datostransferencia', (err, result) => {
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
  db.query('SELECT * FROM datostransferencia WHERE idDatosTransferencia = ?', [datosTransferenciaId], (err, result) => {
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
  const { nombreBanco, numCuenta, duenoCuenta, clabeBanco } = req.body;

  // Validación básica
  if (!nombreBanco || !numCuenta || !duenoCuenta || !clabeBanco) {
    return res.status(400).send('Todos los campos (nombreBanco, numCuenta, duenoCuenta, clabeBanco) son requeridos');
  }

  // Consulta para insertar los datos en la base de datos
  const query = 'INSERT INTO datostransferencia (nombreBanco, numCuenta, duenoCuenta, clabeBanco) VALUES (?, ?, ?, ?)';
  const values = [nombreBanco, numCuenta, duenoCuenta, clabeBanco];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al agregar nuevos datos de transferencia:', err);
      return res.status(500).send('Error al agregar nuevos datos de transferencia');
    }
    res.status(201).send('Nuevos datos de transferencia agregados correctamente');
  });
};

// Actualizar datos de transferencia existentes
exports.updateDatosTransferencia = (req, res) => {
  const { idDatosTransferencia, nombreBanco, numCuenta, duenoCuenta, clabeBanco } = req.body;

  if (!idDatosTransferencia) {
    return res.status(400).send('El campo idDatosTransferencia es requerido');
  }

  const updatedDatosTransferencia = { nombreBanco, numCuenta, duenoCuenta, clabeBanco };
  db.query('UPDATE datostransferencia SET ? WHERE idDatosTransferencia = ?', [updatedDatosTransferencia, idDatosTransferencia], (err, result) => {
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
  const { idDatosTransferencia } = req.body;

  if (!idDatosTransferencia) {
    return res.status(400).send('El campo idDatosTransferencia es requerido');
  }

  db.query('DELETE FROM datostransferencia WHERE idDatosTransferencia = ?', [idDatosTransferencia], (err, result) => {
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


