const mongoose = require('mongoose');

const OccasionSchema = new mongoose.Schema({
    name:{
        type: String,
        enum: [
            'Repas quotidien',
            'Fête de famille',
            'Ramadan',
            'Noël',
            'Anniversaire',
            'Saint-Valentin',
            'Pique-nique',
            'Dîner romantique',
            'Réveillon',
            'Petit dej / Brunch',
            'Apéritif',
            'Entrées',
            'Déssert',
            'Accompagnements'
        ],
    }
})

module.exports = mongoose.model('Occasion', OccasionSchema)