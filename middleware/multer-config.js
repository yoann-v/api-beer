const multer = require('multer');

// Differente extention
const MINE_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    // Nom du dossier où sont les images
    destination: (req, file, callback) => {
        callback(null, 'image')
    },
    // Change le nom de fichier de base
    filename: (req, file, callback) => {
        // Change les espaces en underscore
        const name = file.originalname.split(' ').join('_');
        // Créer l'extension
        const extension = MINE_TYPES[file.mimetype];
        // Redefini le nom de fichier 
        callback(null, name + Math.round(Math.random() * 10000) + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');