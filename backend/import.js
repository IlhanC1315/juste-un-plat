const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const Recette = require('./models/recette');

async function importRecette() {
    try {
        await connectDB();
        console.log('connecter a la base de donnée')
        const filePath = path.join(__dirname, 'recette.json');
        //je vais dans mon fichier recette.json
        const data = fs.readFileSync(filePath, 'utf-8');
        //je le lis
        const recettes = JSON.parse(data)
        //puis je le parse en JSON
        await Recette.insertMany(recettes)
        //pour les ajouter dans ma bdd
        console.log('Importation reussi')
    } catch (err) {
        console.error("Erreur d'importation :", err.message)
    } finally {
        //finalement je ferme tout 
        process.exit(0);
    }
}

importRecette();