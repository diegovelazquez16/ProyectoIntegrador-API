//ok
const db = require('../baseDatos/dataBase');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

const upload = multer({ 
    storage, 
    limits: { fileSize: 10 * 1024 * 1024 }, // Limita el tamaño del archivo a 10MB
    fileFilter: (req, file, cb) => {        
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Please upload an image'));
        }
        cb(null, true);
    }
});

const uploadImage = (req, res) => {
    console.log('Request file:', req.file);
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const { filename, path: filepath } = req.file;

    const sql = 'INSERT INTO img_data (filename, filepath) VALUES (?, ?)';
    db.query(sql, [filename, filepath], (err, result) => {
        if (err) {
            console.error('Error inserting into database:', err);
            return res.status(500).send('Error uploading image');
        }
        res.json({ filename }); // <-- Responder con el nombre del archivo
    });
};




const getImages = (req, res) => {
    const sql = 'SELECT * FROM img_data';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching from database:', err);
            return res.status(500).send('Error fetching images');
        }
        res.json(results);
    });
};

module.exports = {
    upload,
    uploadImage,
    getImages
};
