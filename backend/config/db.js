const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/bddRecettes');
        console.log('Connecté à MongoDB')
    } catch (err) {
        console.error('Erreur de connexion MongoDB :', err.message)
        process.exit(1);
    }
}

module.exports = connectDB;
