const multer = require('multer')
const path = require('path')

//configuration du stockage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/recipes/"); // dossier a la racine backend
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

//filtre pour limiter aux images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Seules les images sont autorisées !'), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;