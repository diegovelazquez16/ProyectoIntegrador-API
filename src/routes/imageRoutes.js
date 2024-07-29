//ok
const express = require('express');
const router = express.Router();
const { upload, uploadImage, getImages } = require('../controllers/imageController');

router.post('/upload', upload.single('image'), uploadImage);
router.get('/images', getImages);

module.exports = router;
