const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: "localhost",
  user:  "root",
  password:  "mysql",
  database:"tiendaUniformesDeportivos3"
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Ventas-Conexión a la BD establecida');
});

// Obtener todas las ventas
exports.getAllVentas = (req, res) => {
  db.query('SELECT * FROM Ventas', (err, result) => {
    if (err) {
      console.error('Error al obtener las ventas:', err);
      return res.status(500).send('Error al obtener las ventas');
    }
    res.json(result);
  });
};

// Obtener una venta por ID
exports.getVentaById = (req, res) => {
  const ventaId = req.params.id;
  db.query('SELECT * FROM Ventas WHERE idVenta = ?', [ventaId], (err, result) => {
    if (err) {
      console.error('Error al obtener la venta:', err);
      return res.status(500).send('Error al obtener la venta');
    }
    if (result.length === 0) {
      return res.status(404).send('Venta no encontrada');
    }
    res.json(result[0]);
  });
};

// Agregar una nueva venta
exports.addVenta = (req, res) => {
  const newVenta = req.body;
  db.query('INSERT INTO Ventas SET ?', newVenta, (err, result) => {
    if (err) {
      console.error('Error al agregar una nueva venta:', err);
      return res.status(500).send('Error al agregar una nueva venta');
    }
    res.status(201).send('Nueva venta agregada correctamente');
  });
};

// Actualizar una venta existente
exports.updateVenta = (req, res) => {
  const ventaId = req.params.id;
  const updatedVenta = req.body;
  db.query('UPDATE Ventas SET ? WHERE idVenta = ?', [updatedVenta, ventaId], (err, result) => {
    if (err) {
      console.error('Error al actualizar la venta:', err);
      return res.status(500).send('Error al actualizar la venta');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Venta no encontrada');
    }
    res.send('Venta actualizada correctamente');
  });
};

// Eliminar una venta
exports.deleteVenta = (req, res) => {
  const ventaId = req.params.id;
  db.query('DELETE FROM Ventas WHERE idVenta = ?', [ventaId], (err, result) => {
    if (err) {
      console.error('Error al eliminar la venta:', err);
      return res.status(500).send('Error al eliminar la venta');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Venta no encontrada');
    }
    res.send('Venta eliminada correctamente');
  });
}; 