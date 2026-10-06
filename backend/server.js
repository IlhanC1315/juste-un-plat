require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const connectDB = require('./config/db');
const seedEnums = require('./seeders/seedEnums');

const app = express();

// Connexion à la base de données
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // ✅ plus besoin de body-parser
app.use(passport.initialize());
require('./config/passport')(passport);
console.log("salut")
// Dossier statique pour les fichiers uploadés
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/recettes', require('./routes/recette.routes'));

// Route racine
app.get('/', (req, res) => {
    res.send("Bienvenue sur l'api de recettes http://localhost:3000");
});

// Middleware de gestion d'erreur globale (facultatif mais utile)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur serveur interne' });
});

// Démarrage du serveur apres connexion a mongoDB et seed
async function startServer() {
    try {
        await connectDB();
        console.log('MongoDB connecté');

        await seedEnums();
        console.log("Enums ajouter a la bdd avec succès")

        const PORT = process.env.PORT 
        app.listen(PORT), () => {
            console.log(`Serveur demarré sur http://localhost:${PORT}`)
        }
    } catch (err) {
        console.error("Erreur au démarrage du server :", err)
        process.exit(1);
    }
}

startServer();
